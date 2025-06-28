import React, { useState } from 'react';
import { Brain, Puzzle, Grid, Shapes, Calculator, Gamepad2Icon } from 'lucide-react';
import Sidebar from './Sidebar';

interface GameState {
  cards?: { id: number; value: string; isFlipped: boolean; isMatched: boolean }[];
  puzzle?: { word: string; hint: string; guesses: string[] };
  sequence?: { pattern: number[]; userPattern: number[]; level: number };
  shapes?: { current: string; options: string[]; correct: string };
  math?: { question: string; answer: number; userAnswer: string };
  currentGame: string | null;
}

export default function Activities() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [gameState, setGameState] = useState<GameState>({
    currentGame: null,
    cards: Array.from({ length: 16 }, (_, index) => ({
      id: index,
      value: String(Math.floor(index / 2) + 1),
      isFlipped: false,
      isMatched: false
    })).sort(() => Math.random() - 0.5),
    puzzle: {
      word: 'MEMORY',
      hint: 'What this game helps improve',
      guesses: []
    },
    sequence: {
      pattern: [1, 2, 3, 4],
      userPattern: [],
      level: 1
    },
    shapes: {
      current: '⭐',
      options: ['⭐', '🔷', '⭕', '🔺'],
      correct: '⭐'
    },
    math: {
      question: '5 + 3',
      answer: 8,
      userAnswer: ''
    }
  });

  const filters = ['All', 'Memory', 'Cognitive', 'Problem Solving'];

  const activities = [
    {
      title: 'Memory Match Game',
      description: 'Match pairs of cards to improve memory',
      icon: Brain,
      category: 'Memory',
      difficulty: 'Easy',
      progress: 75,
      game: 'memory'
    },
    {
      title: 'Word Association',
      description: "Solve word puzzles with helpful hints",
      icon: Puzzle,
      category: 'Cognitive',
      difficulty: 'Medium',
      progress: 50,
      game: 'puzzle'
    },
    {
      title: 'Pattern Sequence',
      description: 'Remember and repeat growing sequences',
      icon: Grid,
      category: 'Memory',
      difficulty: 'Medium',
      progress: 30,
      game: 'sequence'
    },
    {
      title: 'Shape Recognition',
      description: 'Match shapes and identify patterns',
      icon: Shapes,
      category: 'Cognitive',
      difficulty: 'Easy',
      progress: 60,
      game: 'shapes'
    },
    {
      title: 'Simple Math',
      description: 'Practice basic arithmetic skills',
      icon: Calculator,
      category: 'Problem Solving',
      difficulty: 'Medium',
      progress: 40,
      game: 'math'
    }
  ];

  const [flippedCards, setFlippedCards] = useState<number[]>([]);

  const handleCardClick = (cardId: number) => {
    if (!gameState.cards) return;
    
    const card = gameState.cards[cardId];
    if (card.isMatched || card.isFlipped || flippedCards.length >= 2) return;

    const newCards = [...gameState.cards];
    newCards[cardId] = { ...card, isFlipped: true };
    setGameState({ ...gameState, cards: newCards });

    if (flippedCards.length === 0) {
      setFlippedCards([cardId]);
    } else {
      const firstCardId = flippedCards[0];
      const firstCard = gameState.cards[firstCardId];
      
      if (firstCard.value === card.value) {
        newCards[firstCardId] = { ...firstCard, isMatched: true };
        newCards[cardId] = { ...card, isMatched: true };
        setGameState({ ...gameState, cards: newCards });
        setFlippedCards([]);
      } else {
        setFlippedCards([...flippedCards, cardId]);
        setTimeout(() => {
          const resetCards = [...newCards];
          resetCards[firstCardId] = { ...firstCard, isFlipped: false };
          resetCards[cardId] = { ...card, isFlipped: false };
          setGameState({ ...gameState, cards: resetCards });
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  const handleSequenceClick = (number: number) => {
    if (!gameState.sequence) return;
    
    const newUserPattern = [...gameState.sequence.userPattern, number];
    const currentLength = newUserPattern.length;
    const isCorrect = newUserPattern.every((num, i) => num === gameState.sequence?.pattern[i]);

    if (!isCorrect) {
      setGameState({
        ...gameState,
        sequence: {
          ...gameState.sequence,
          userPattern: [],
          level: Math.max(1, gameState.sequence.level - 1)
        }
      });
      return;
    }

    if (currentLength === gameState.sequence.pattern.length) {
      const newPattern = [...gameState.sequence.pattern, Math.floor(Math.random() * 4) + 1];
      setGameState({
        ...gameState,
        sequence: {
          pattern: newPattern,
          userPattern: [],
          level: gameState.sequence.level + 1
        }
      });
    } else {
      setGameState({
        ...gameState,
        sequence: {
          ...gameState.sequence,
          userPattern: newUserPattern
        }
      });
    }
  };

  const handleMathInput = (value: string) => {
    if (!gameState.math) return;
    
    setGameState({
      ...gameState,
      math: {
        ...gameState.math,
        userAnswer: value
      }
    });
  };

  const handleShapeClick = (shape: string) => {
    if (!gameState.shapes) return;
    
    if (shape === gameState.shapes.correct) {
      const shapes = ['⭐', '🔷', '⭕', '🔺'];
      const newShape = shapes[Math.floor(Math.random() * shapes.length)];
      const options = shapes.sort(() => Math.random() - 0.5);
      
      setGameState({
        ...gameState,
        shapes: {
          current: newShape,
          options,
          correct: newShape
        }
      });
    }
  };

  const renderMemoryGame = () => {
    if (!gameState.cards) return null;

    return (
      <div className="p-8">
      <Sidebar/>

        <h2 className="text-2xl font-bold mb-4">Memory Match Game</h2>
        <p className="text-gray-600 mb-8">Match pairs of cards to improve memory</p>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {gameState.cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`w-20 h-20 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 ${
                card.isFlipped || card.isMatched
                  ? 'bg-black text-white'
                  : 'bg-gray-200'
              }`}
            >
              {(card.isFlipped || card.isMatched) && card.value}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderSequenceGame = () => {
    if (!gameState.sequence) return null;

    return (
      <div className="p-8">
      <Sidebar/>
        <h2 className="text-2xl font-bold mb-4">Pattern Sequence</h2>
        <p className="text-gray-600 mb-8">Level {gameState.sequence.level}: Remember and repeat the sequence</p>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleSequenceClick(num)}
              className="w-24 h-24 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-2xl font-bold"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Pattern: {gameState.sequence.pattern.join(' → ')}
          </p>
          <p className="text-gray-600 mt-2">
            Your sequence: {gameState.sequence.userPattern.join(' → ')}
          </p>
        </div>
      </div>
    );
  };

  const renderShapeGame = () => {
    if (!gameState.shapes) return null;

    return (
      <div className="p-8">
      <Sidebar/>
        <h2 className="text-2xl font-bold mb-4">Shape Recognition</h2>
        <p className="text-gray-600 mb-8">Match the shape shown above</p>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{gameState.shapes.current}</div>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {gameState.shapes.options.map((shape, index) => (
            <button
              key={index}
              onClick={() => handleShapeClick(shape)}
              className="w-24 h-24 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center text-4xl"
            >
              {shape}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderMathGame = () => {
    if (!gameState.math) return null;

    return (
      <div className="p-8">
      <Sidebar/>
        <h2 className="text-2xl font-bold mb-4">Simple Math</h2>
        <p className="text-gray-600 mb-8">Solve basic arithmetic problems</p>
        <div className="max-w-md mx-auto text-center">
          <div className="text-3xl mb-4">{gameState.math.question} = ?</div>
          <input
            type="number"
            value={gameState.math.userAnswer}
            onChange={(e) => handleMathInput(e.target.value)}
            className="w-24 h-12 text-center text-2xl border rounded-lg"
          />
          <button
            onClick={() => {
              if (parseInt(gameState.math?.userAnswer || '0') === gameState.math?.answer) {
                const num1 = Math.floor(Math.random() * 10);
                const num2 = Math.floor(Math.random() * 10);
                setGameState({
                  ...gameState,
                  math: {
                    question: `${num1} + ${num2}`,
                    answer: num1 + num2,
                    userAnswer: ''
                  }
                });
              }
            }}
            className="ml-4 px-6 py-2 bg-black text-white rounded-lg"
          >
            Check
          </button>
        </div>
      </div>
    );
  };

  const renderGameContent = () => {
    switch (gameState.currentGame) {
      case 'memory':
        return renderMemoryGame();
      case 'sequence':
        return renderSequenceGame();
      case 'shapes':
        return renderShapeGame();
      case 'math':
        return renderMathGame();
      default:
        return (
          <div className="p-8 text-center text-gray-600">
            Select an activity to begin
          </div>
        );
    }
  };

  const filteredActivities = activeFilter === 'All'
    ? activities
    : activities.filter(activity => activity.category === activeFilter);

  if (gameState.currentGame) {
    return (
      <div className="min-h-screen bg-gray-50">
      <Sidebar/>
        <div className="max-w-4xl mx-auto pt-8">
          <div className="bg-white rounded-2xl shadow-sm">
            {renderGameContent()}
            <div className="p-8 pt-0 flex justify-between">
              <button
                onClick={() => setGameState({ ...gameState, currentGame: null })}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Back to Activities
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50 p-8 ml-72 "  >
      <Sidebar/>
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center gap-2">
          <Gamepad2Icon className="w-8 h-8 text-indigo-900" />
          <h1 className="text-3xl font-bold text-indigo-900 mb-2 block">Cognitive Activities</h1>
          <p className="text-indigo-800 block ">Brain training exercises for cognitive health</p>
        </div>

        <div className="bg-white rounded-2xl p-8 mb-6  bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Activity Progress</h2>
              <p className="text-white">Track your progress across different activities</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-900">Level 3</span>
            </div>
          </div>
          
          {activities.map((activity, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <activity.icon className="w-5 h-5" />
                  <span className=" font-medium">{activity.title}</span>
                </div>
                <span className="bg-gradient-to-r from-purple-600 to-indigo text-white px-3 py-1 rounded-lg">{activity.progress}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full  bg-gradient-to-r from-green-600 to-green-800 rounded-full"
                  style={{ width: `${activity.progress}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-b from-purple-800 to-purple-900 group-hover:from-purple-800/95 group-hover:to-purple-800/40 ${
                activeFilter === filter
                  ? 'bg-black text-white'
                  : 'bg-white text-gray-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {filteredActivities.map((activity, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 b">
              <div className="flex justify-between items-start mb-4 ">
                <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                <activity.icon className="w-6 h-6 text-gradient-to-r from-pink-500 to-purple-500 " />
              </div>
              <p className="text-gray-600 mb-6">{activity.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm">
                  {activity.category}
                </span>
                <span className="bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-sm">
                  {activity.difficulty}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Progress</span>
                  <span>{activity.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full"
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
                <button
                  onClick={() => setGameState({ ...gameState, currentGame: activity.game })}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl py-3 mt-4 font-medium"
                >
                  {activity.progress > 0 ? 'Continue' : 'Start'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 


