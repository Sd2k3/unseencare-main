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
        <h2 className="text-2xl font-bold mb-4 text-pink-800">Memory Match Game</h2>
        <p className="text-pink-600 mb-8">Match pairs of cards to improve memory</p>
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
          {gameState.cards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`w-20 h-20 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg ${
                card.isFlipped || card.isMatched
                  ? 'bg-gradient-to-br from-pink-500 to-pink-600 text-white'
                  : 'bg-gradient-to-br from-pink-100 to-pink-200 hover:from-pink-200 hover:to-pink-300'
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
        <h2 className="text-2xl font-bold mb-4 text-pink-800">Pattern Sequence</h2>
        <p className="text-pink-600 mb-8">Level {gameState.sequence.level}: Remember and repeat the sequence</p>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {[1, 2, 3, 4].map((num) => (
            <button
              key={num}
              onClick={() => handleSequenceClick(num)}
              className="w-24 h-24 rounded-lg bg-gradient-to-br from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 hover:scale-105 transition-all duration-200 flex items-center justify-center text-2xl font-bold text-pink-800 shadow-lg"
            >
              {num}
            </button>
          ))}
        </div>
        <div className="mt-8 text-center">
          <p className="text-pink-600">
            Pattern: {gameState.sequence.pattern.join(' → ')}
          </p>
          <p className="text-pink-600 mt-2">
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
        <h2 className="text-2xl font-bold mb-4 text-pink-800">Shape Recognition</h2>
        <p className="text-pink-600 mb-8">Match the shape shown above</p>
        <div className="text-center mb-8">
          <div className="text-6xl mb-4 bg-gradient-to-br from-pink-100 to-pink-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto shadow-lg">
            {gameState.shapes.current}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
          {gameState.shapes.options.map((shape, index) => (
            <button
              key={index}
              onClick={() => handleShapeClick(shape)}
              className="w-24 h-24 rounded-lg bg-gradient-to-br from-pink-200 to-pink-300 hover:from-pink-300 hover:to-pink-400 hover:scale-105 transition-all duration-200 flex items-center justify-center text-4xl shadow-lg"
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
        <h2 className="text-2xl font-bold mb-4 text-pink-800">Simple Math</h2>
        <p className="text-pink-600 mb-8">Solve basic arithmetic problems</p>
        <div className="max-w-md mx-auto text-center">
          <div className="text-3xl mb-4 text-pink-700">{gameState.math.question} = ?</div>
          <input
            type="number"
            value={gameState.math.userAnswer}
            onChange={(e) => handleMathInput(e.target.value)}
            className="w-24 h-12 text-center text-2xl border-2 border-pink-200 rounded-lg focus:border-pink-400 focus:outline-none"
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
            className="ml-4 px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-lg hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-lg"
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
          <div className="p-8 text-center text-pink-600">
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
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 relative">
        <Sidebar/>
        <div className="max-w-4xl mx-auto pt-8 ml-64">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-pink-200">
            {renderGameContent()}
            <div className="p-8 pt-0 flex justify-between">
              <button
                onClick={() => setGameState({ ...gameState, currentGame: null })}
                className="px-6 py-2 text-pink-600 hover:text-pink-800 hover:bg-pink-100 rounded-lg transition-all duration-200"
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
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-pink-100 to-rose-100 p-8 ml-64 relative">
      {/* Floating particles for ambiance */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-pink-200/30 animate-pulse"
            style={{
              width: Math.random() * 8 + 4 + 'px',
              height: Math.random() * 8 + 4 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: (Math.random() * 10 + 10) + 's'
            }}
          />
        ))}
      </div>
      
      <Sidebar/>
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8 flex items-center gap-4">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl shadow-lg">
            <Gamepad2Icon className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
              Cognitive Activities
            </h1>
            <p className="text-pink-700 text-lg">Brain training exercises for cognitive health</p>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 mb-6 shadow-xl border border-pink-200 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Activity Progress</h2>
              <p className="text-pink-100">Track your progress across different activities</p>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
              <span className="text-white font-semibold">Level 3</span>
            </div>
          </div>
          
          {activities.map((activity, index) => (
            <div key={index} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <activity.icon className="w-5 h-5 text-pink-100" />
                  <span className="font-medium text-white">{activity.title}</span>
                </div>
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-lg font-semibold">
                  {activity.progress}%
                </span>
              </div>
              <div className="h-3 bg-pink-200/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-white/80 rounded-full transition-all duration-500"
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
              className={`px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-105 shadow-lg ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                  : 'bg-white/90 backdrop-blur-sm text-pink-700 hover:bg-white border border-pink-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredActivities.map((activity, index) => (
            <div key={index} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-pink-200 hover:shadow-2xl hover:scale-105 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-pink-800 group-hover:text-pink-900">{activity.title}</h3>
                <div className="p-2 bg-gradient-to-br from-pink-100 to-rose-100 rounded-lg group-hover:from-pink-200 group-hover:to-rose-200 transition-all duration-200">
                  <activity.icon className="w-6 h-6 text-pink-600" />
                </div>
              </div>
              <p className="text-pink-600 mb-6">{activity.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium">
                  {activity.category}
                </span>
                <span className="bg-rose-100 text-rose-800 px-3 py-1 rounded-full text-sm font-medium">
                  {activity.difficulty}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm text-pink-700">
                  <span>Progress</span>
                  <span className="font-semibold">{activity.progress}%</span>
                </div>
                <div className="h-2 bg-pink-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-500"
                    style={{ width: `${activity.progress}%` }}
                  />
                </div>
                <button
                  onClick={() => setGameState({ ...gameState, currentGame: activity.game })}
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl py-3 mt-4 font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg hover:shadow-xl"
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
