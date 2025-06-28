import React, { useState } from 'react';
import { 
  BarChart3, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Pill,
  Heart,
  Clock,
  FileText,
  Share,
  Filter,
  Eye
} from 'lucide-react';

interface Report {
  id: string;
  title: string;
  period: string;
  generatedDate: string;
  type: 'weekly' | 'monthly' | 'quarterly';
  status: 'ready' | 'generating' | 'scheduled';
}

const ProgressReports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [showGenerateForm, setShowGenerateForm] = useState(false);

  const reports: Report[] = [
    {
      id: '1',
      title: 'Monthly Health Summary - January 2024',
      period: 'January 2024',
      generatedDate: '2024-01-31',
      type: 'monthly',
      status: 'ready'
    },
    {
      id: '2',
      title: 'Weekly Progress Report - Week 4',
      period: 'Jan 22-28, 2024',
      generatedDate: '2024-01-28',
      type: 'weekly',
      status: 'ready'
    },
    {
      id: '3',
      title: 'Quarterly Review - Q4 2023',
      period: 'Oct-Dec 2023',
      generatedDate: '2024-01-01',
      type: 'quarterly',
      status: 'ready'
    }
  ];

  const keyMetrics = [
    {
      title: 'Seizure Frequency',
      current: '2 this month',
      previous: '3 last month',
      trend: 'down',
      change: '-33%',
      color: 'text-green-600'
    },
    {
      title: 'Medication Adherence',
      current: '98%',
      previous: '93%',
      trend: 'up',
      change: '+5%',
      color: 'text-green-600'
    },
    {
      title: 'Average Mood',
      current: '7.8/10',
      previous: '7.2/10',
      trend: 'up',
      change: '+8%',
      color: 'text-green-600'
    },
    {
      title: 'Sleep Quality',
      current: '7.5/10',
      previous: '8.1/10',
      trend: 'down',
      change: '-7%',
      color: 'text-red-600'
    }
  ];

  const chartData = {
    seizures: [
      { month: 'Sep', count: 4 },
      { month: 'Oct', count: 3 },
      { month: 'Nov', count: 2 },
      { month: 'Dec', count: 3 },
      { month: 'Jan', count: 2 }
    ],
    mood: [
      { month: 'Sep', score: 6.8 },
      { month: 'Oct', score: 7.1 },
      { month: 'Nov', score: 7.5 },
      { month: 'Dec', score: 7.2 },
      { month: 'Jan', score: 7.8 }
    ]
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <BarChart3 className="w-8 h-8 text-blue-500" />
            <span>Progress Reports</span>
          </h1>
          <p className="text-gray-600">Comprehensive analytics and downloadable reports for doctors</p>
        </div>
        <button
          onClick={() => setShowGenerateForm(true)}
          className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <FileText className="w-5 h-5" />
          <span>Generate Report</span>
        </button>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {keyMetrics.map((metric, index) => (
          <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-pink-200/50">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                {index === 0 && <Activity className="w-6 h-6 text-blue-600" />}
                {index === 1 && <Pill className="w-6 h-6 text-blue-600" />}
                {index === 2 && <Heart className="w-6 h-6 text-blue-600" />}
                {index === 3 && <Clock className="w-6 h-6 text-blue-600" />}
              </div>
              <div className={`flex items-center space-x-1 ${metric.color}`}>
                {metric.trend === 'up' ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                <span className="text-sm font-medium">{metric.change}</span>
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{metric.current}</h3>
            <p className="text-sm text-gray-600">{metric.title}</p>
            <p className="text-xs text-gray-500">vs {metric.previous}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Seizure Frequency Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Seizure Frequency Trend</h2>
          <div className="space-y-4">
            {chartData.seizures.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="bg-gradient-to-r from-red-400 to-rose-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(data.count / 5) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">{data.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mood Trend Chart */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Mood Score Trend</h2>
          <div className="space-y-4">
            {chartData.mood.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-4">
                <div className="w-12 text-sm text-gray-600">{data.month}</div>
                <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-emerald-500 h-6 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(data.score / 10) * 100}%` }}
                  >
                    <span className="text-white text-xs font-medium">{data.score}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Generated Reports */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Generated Reports</h2>
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select 
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="all">All Reports</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          {reports.map((report) => (
            <div key={report.id} className="bg-white/50 rounded-xl p-4 hover:bg-white/70 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    report.type === 'weekly' ? 'bg-blue-100 text-blue-600' :
                    report.type === 'monthly' ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{report.title}</h3>
                    <p className="text-sm text-gray-600">Period: {report.period}</p>
                    <p className="text-xs text-gray-500">Generated: {report.generatedDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    report.status === 'ready' ? 'bg-green-100 text-green-800' :
                    report.status === 'generating' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {report.status}
                  </span>
                  <div className="flex space-x-1">
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Download className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Share className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">AI Insights & Recommendations</h2>
        <div className="space-y-4">
          <div className="p-4 bg-green-50 rounded-xl border border-green-200">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-green-500 rounded-full">
                <TrendingUp className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-green-800">Positive Trend</h3>
                <p className="text-sm text-green-700">Your seizure frequency has decreased by 33% this month. Your consistent medication adherence is likely contributing to this improvement.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-blue-500 rounded-full">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-blue-800">Mood Improvement</h3>
                <p className="text-sm text-blue-700">Your mood scores show steady improvement. The meditation sessions and journaling appear to be having a positive impact.</p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 rounded-xl border border-yellow-200">
            <div className="flex items-start space-x-3">
              <div className="p-1 bg-yellow-500 rounded-full">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="font-medium text-yellow-800">Sleep Attention Needed</h3>
                <p className="text-sm text-yellow-700">Your sleep quality has declined slightly. Consider reviewing your bedtime routine and discussing sleep hygiene with your doctor.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Report Modal */}
      {showGenerateForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Generate New Report</h2>
              <button
                onClick={() => setShowGenerateForm(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ×
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="weekly">Weekly Summary</option>
                  <option value="monthly">Monthly Report</option>
                  <option value="quarterly">Quarterly Review</option>
                  <option value="custom">Custom Period</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Include Data</label>
                <div className="space-y-2">
                  {[
                    'Seizure logs',
                    'Medication adherence',
                    'Mood diary entries',
                    'Sleep patterns',
                    'Trigger analysis',
                    'Progress charts'
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="pdf">PDF Document</option>
                  <option value="excel">Excel Spreadsheet</option>
                  <option value="csv">CSV Data</option>
                </select>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowGenerateForm(false)}
                  className="flex-1 py-3 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-400 to-indigo-500 text-white rounded-lg hover:shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Generate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressReports;