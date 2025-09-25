import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { BookOpen, TrendingUp, Star, Calendar, Bell, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { colleges, careerPaths } = useData();

  // Mock user preferences and recommendations
  const recommendedColleges = colleges.slice(0, 3);
  const recommendedCareers = careerPaths.slice(0, 2);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h1>
          <p className="text-gray-600">
            Here's your personalized dashboard with recommendations and updates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">12</div>
                    <div className="text-gray-600 text-sm">Saved Colleges</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">8</div>
                    <div className="text-gray-600 text-sm">Career Interests</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-500 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">95%</div>
                    <div className="text-gray-600 text-sm">Profile Complete</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Recommended Colleges */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recommended Colleges</h2>
                <Link to="/colleges" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All →
                </Link>
              </div>
              <div className="space-y-4">
                {recommendedColleges.map((college) => (
                  <Link
                    key={college.id}
                    to={`/college/${college.id}`}
                    className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-1">{college.name}</h3>
                        <p className="text-gray-600 text-sm">{college.location}, {college.state}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Rank #{college.ranking}
                          </span>
                          <span className="text-xs text-gray-500">
                            95% match with your preferences
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{(college.fees.undergraduate / 100000).toFixed(1)}L
                        </div>
                        <div className="text-xs text-gray-500">Annual Fees</div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Career Recommendations */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Career Recommendations</h2>
                <Link to="/career-guidance" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Explore All →
                </Link>
              </div>
              <div className="space-y-4">
                {recommendedCareers.map((career) => (
                  <div key={career.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{career.title}</h3>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {career.description}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                            +{career.industryGrowth}% Growth
                          </span>
                          <span className="text-xs text-gray-500">
                            92% match with your interests
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-gray-900">
                          ₹{(career.averageSalary.entry / 100000).toFixed(1)}L
                        </div>
                        <div className="text-xs text-gray-500">Starting Salary</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">
                    {user?.email?.charAt(0).toUpperCase() || 'U'}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Student Profile</h3>
                <p className="text-gray-600 text-sm mb-4">{user?.email}</p>
                <div className="flex items-center justify-center space-x-2">
                  <Settings className="h-4 w-4 text-gray-400" />
                  <Link to="#" className="text-blue-600 hover:text-blue-800 text-sm">
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="text-gray-900">Viewed IIT Delhi</div>
                    <div className="text-gray-500 text-xs">2 hours ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="text-gray-900">Saved Software Engineer career</div>
                    <div className="text-gray-500 text-xs">1 day ago</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <div className="text-sm">
                    <div className="text-gray-900">Completed interest assessment</div>
                    <div className="text-gray-500 text-xs">3 days ago</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                <Bell className="h-4 w-4 text-gray-400" />
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-blue-900 mb-1">
                    New college added to your favorites
                  </div>
                  <div className="text-xs text-blue-700">
                    Based on your search history
                  </div>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="text-sm font-medium text-green-900 mb-1">
                    Career assessment ready
                  </div>
                  <div className="text-xs text-green-700">
                    Take the quiz to get better recommendations
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <Link
                  to="/colleges"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  🎓 Search Colleges
                </Link>
                <Link
                  to="/career-guidance"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  🚀 Explore Careers
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  📊 Take Assessment
                </button>
                <Link
                  to="/career-quiz"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  🧠 Career Interest Quiz
                </Link>
                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  💬 Chat with Counselor
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;