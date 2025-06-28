import React, { useState } from 'react';
import { 
  Award, 
  Star, 
  Trophy, 
  Target, 
  Calendar,
  Flame,
  Gift,
  CheckCircle,
  Lock,
  Zap
} from 'lucide-react';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  progress: number;
  maxProgress: number;
  unlocked: boolean;
  points: number;
  category: string;
}

interface DailyGoal {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  points: number;
  icon: React.ReactNode;
}

const DailyStreaks: React.FC = () => {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [totalPoints, setTotalPoints] = useState(2450);
  const [level, setLevel] = useState(8);

  const [dailyGoals, setDailyGoals] = useState<DailyGoal[]>([
    {
      id: '1',
      title: 'Take Morning Medication',
      description: 'Take your prescribed medication on time',
      completed: true,
      points: 50,
      icon: <Target className="w-5 h-5" />
    },
    {
      id: '2',
      title: 'Log Mood Entry',
      description: 'Record your daily mood and activities',
      completed: true,
      points: 30,
      icon: <Star className="w-5 h-5" />
    },
    {
      id: '3',
      title: 'Complete Meditation',
      description: '10 minutes of mindfulness or relaxation',
      completed: false,
      points: 40,
      icon: <Zap className="w-5 h-5" />
    },
    {
      id: '4',
      title: 'Evening Medication',
      description: 'Take your evening dose',
      completed: false,
      points: 50,
      icon: <Target className="w-5 h-5" />
    }
  ]);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Medication Master',
      description: 'Take medication on time for 7 days straight',
      icon: <Trophy className="w-6 h-6" />,
      progress: 7,
      maxProgress: 7,
      unlocked: true,
      points: 200,
      category: 'medication'
    },
    {
      id: '2',
      title: 'Streak Starter',
      description: 'Maintain a 10-day streak',
      icon: <Flame className="w-6 h-6" />,
      progress: 12,
      maxProgress: 10,
      unlocked: true,
      points: 300,
      category: 'streak'
    },
    {
      id: '3',
      title: 'Mood Tracker',
      description: 'Log mood entries for 30 days',
      icon: <Star className="w-6 h-6" />,
      progress: 25,
      maxProgress: 30,
      unlocked: false,
      points: 400,
      category: 'mood'
    },
    {
      id: '4',
      title: 'Wellness Warrior',
      description: 'Complete 50 meditation sessions',
      icon: <Award className="w-6 h-6" />,
      progress: 32,
      maxProgress: 50,
      unlocked: false,
      points: 500,
      category: 'wellness'
    },
    {
      id: '5',
      title: 'Consistency Champion',
      description: 'Maintain a 30-day streak',
      icon: <Trophy className="w-6 h-6" />,
      progress: 12,
      maxProgress: 30,
      unlocked: false,
      points: 1000,
      category: 'streak'
    },
    {
      id: '6',
      title: 'Health Hero',
      description: 'Reach level 10',
      icon: <Award className="w-6 h-6" />,
      progress: 8,
      maxProgress: 10,
      unlocked: false,
      points: 750,
      category: 'level'
    }
  ];

  const rewards = [
    { id: '1', title: 'Custom Theme', cost: 500, unlocked: true },
    { id: '2', title: 'Progress Badge', cost: 300, unlocked: true },
    { id: '3', title: 'Meditation Pack', cost: 800, unlocked: false },
    { id: '4', title: 'Premium Features', cost: 1500, unlocked: false }
  ];

  const toggleGoal = (goalId: string) => {
    setDailyGoals(prev => 
      prev.map(goal => 
        goal.id === goalId 
          ? { ...goal, completed: !goal.completed }
          : goal
      )
    );
  };

  const completedGoals = dailyGoals.filter(goal => goal.completed).length;
  const dailyProgress = (completedGoals / dailyGoals.length) * 100;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Award className="w-8 h-8 text-amber-500" />
            <span>Daily Streaks & Rewards</span>
          </h1>
          <p className="text-gray-600">Stay motivated with gamified progress tracking</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Flame className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{currentStreak}</h3>
          <p className="text-sm text-gray-600">Day Streak</p>
          <p className="text-xs text-orange-600">Personal best!</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Star className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{totalPoints}</h3>
          <p className="text-sm text-gray-600">Total Points</p>
          <p className="text-xs text-yellow-600">+80 today</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">Level {level}</h3>
          <p className="text-sm text-gray-600">Current Level</p>
          <p className="text-xs text-purple-600">250 to next level</p>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">{Math.round(dailyProgress)}%</h3>
          <p className="text-sm text-gray-600">Today's Progress</p>
          <p className="text-xs text-green-600">{completedGoals}/{dailyGoals.length} goals</p>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Today's Goals</h2>
          <div className="flex items-center space-x-2">
            <div className="w-32 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${dailyProgress}%` }}
              ></div>
            </div>
            <span className="text-sm text-gray-600">{Math.round(dailyProgress)}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dailyGoals.map((goal) => (
            <div 
              key={goal.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                goal.completed 
                  ? 'bg-green-50 border-green-200 hover:bg-green-100' 
                  : 'bg-white/50 border-gray-200 hover:bg-white/70'
              }`}
              onClick={() => toggleGoal(goal.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${
                    goal.completed ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {goal.completed ? <CheckCircle className="w-5 h-5" /> : goal.icon}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${goal.completed ? 'text-green-800' : 'text-gray-800'}`}>
                      {goal.title}
                    </h3>
                    <p className={`text-sm ${goal.completed ? 'text-green-600' : 'text-gray-600'}`}>
                      {goal.description}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${goal.completed ? 'text-green-600' : 'text-gray-600'}`}>
                    +{goal.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => (
            <div 
              key={achievement.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                achievement.unlocked
                  ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${
                  achievement.unlocked 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-300 text-gray-500'
                }`}>
                  {achievement.unlocked ? achievement.icon : <Lock className="w-6 h-6" />}
                </div>
                <div className="text-right">
                  <div className={`text-lg font-bold ${
                    achievement.unlocked ? 'text-yellow-600' : 'text-gray-500'
                  }`}>
                    +{achievement.points}
                  </div>
                  <div className="text-xs text-gray-500">points</div>
                </div>
              </div>
              
              <h3 className={`font-semibold mb-1 ${
                achievement.unlocked ? 'text-gray-800' : 'text-gray-500'
              }`}>
                {achievement.title}
              </h3>
              <p className={`text-sm mb-3 ${
                achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {achievement.description}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-gray-600">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-yellow-400 to-amber-500' 
                        : 'bg-gray-400'
                    }`}
                    style={{ width: `${Math.min((achievement.progress / achievement.maxProgress) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rewards Store */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Rewards Store</h2>
          <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
            <Star className="w-4 h-4 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">{totalPoints} points</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward) => (
            <div 
              key={reward.id}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                reward.unlocked
                  ? 'bg-green-50 border-green-200'
                  : totalPoints >= reward.cost
                    ? 'bg-white border-blue-200 hover:border-blue-300 cursor-pointer'
                    : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                  reward.unlocked 
                    ? 'bg-green-500 text-white'
                    : totalPoints >= reward.cost
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-300 text-gray-500'
                }`}>
                  {reward.unlocked ? <CheckCircle className="w-6 h-6" /> : <Gift className="w-6 h-6" />}
                </div>
                
                <h3 className="font-semibold text-gray-800 mb-2">{reward.title}</h3>
                
                <div className="text-lg font-bold text-gray-800 mb-3">
                  {reward.cost} points
                </div>
                
                <button 
                  className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    reward.unlocked
                      ? 'bg-green-500 text-white cursor-default'
                      : totalPoints >= reward.cost
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={reward.unlocked || totalPoints < reward.cost}
                >
                  {reward.unlocked ? 'Unlocked' : totalPoints >= reward.cost ? 'Redeem' : 'Not enough points'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Challenge */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-pink-500" />
          <span>Weekly Challenge</span>
        </h2>
        
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Consistency Master</h3>
              <p className="text-gray-600">Complete all daily goals for 5 days this week</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">+500</div>
              <div className="text-sm text-gray-600">bonus points</div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Progress</span>
              <span>3/5 days</span>
            </div>
            <div className="w-full bg-white/50 rounded-full h-3">
              <div className="bg-gradient-to-r from-purple-400 to-pink-500 h-3 rounded-full w-3/5"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyStreaks;