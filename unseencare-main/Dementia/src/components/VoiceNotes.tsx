import React, { useState, useRef } from 'react';
import { Mic, Square, Play, Trash2 } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './Sidebar';



interface VoiceNote {
  id: string;
  blob: Blob;
  timestamp: Date;
  duration: number;
}

export default function VoiceNotes() {
  const [isRecording, setIsRecording] = useState(false);
  const [voiceNotes, setVoiceNotes] = useState<VoiceNote[]>([]);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<Date | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const duration = startTimeRef.current
          ? Math.round((new Date().getTime() - startTimeRef.current.getTime()) / 1000)
          : 0;

        setVoiceNotes(prev => [...prev, {
          id: uuidv4(),
          blob: audioBlob,
          timestamp: new Date(),
          duration,
        }]);
      };

      mediaRecorder.start();
      startTimeRef.current = new Date();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const playVoiceNote = (note: VoiceNote) => {
    const audio = new Audio(URL.createObjectURL(note.blob));
    audio.onended = () => setCurrentlyPlaying(null);
    audio.play();
    setCurrentlyPlaying(note.id);
  };

  const deleteVoiceNote = (id: string) => {
    setVoiceNotes(prev => prev.filter(note => note.id !== id));
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatTimestamp = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };

  return (
    <>
    <Sidebar/>
    <div className={` 'bg-white' rounded-xl shadow-lg p-6 ml-72`}>
      <h2 className={`text-xl font-semibold mb-6  'text-gray-900'`}>
        Voice Notes
      </h2>

      <div className="flex justify-center mb-8">
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className={`p-6 rounded-full ${
            isRecording
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-purple-600 hover:bg-purple-700'
          }`}
        >
          {isRecording ? (
            <Square className="h-8 w-8 text-white" />
          ) : (
            <Mic className="h-8 w-8 text-white" />
          )}
        </button>
      </div>

      <div className="space-y-4">
        {voiceNotes.map((note) => (
          <div
            key={note.id}
            className={`p-4 rounded-lg flex items-center justify-between  'bg-gray-50'`}
          >
            <div className="flex items-center space-x-4">
              <button
                onClick={() => playVoiceNote(note)}
                className={`p-2 rounded-full ${
                  currentlyPlaying === note.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                <Play className="h-5 w-5" />
              </button>
              <div>
                <p className={`font-medium  'text-gray-900'`}>
                  Voice Note
                </p>
                <p className={`text-sm  'text-gray-600'`}>
                  {formatTimestamp(note.timestamp)} • {formatDuration(note.duration)}
                </p>
              </div>
            </div>
            <button
              onClick={() => deleteVoiceNote(note.id)}
              className={`p-2 rounded-full  'hover:bg-gray-200 text-gray-600'`}
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}