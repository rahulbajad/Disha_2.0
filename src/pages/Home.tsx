import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, GraduationCap, TrendingUp, Users, Award, ArrowRight } from 'lucide-react';

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const features = [
    {
      icon: <GraduationCap className="h-8 w-8 text-blue-600" />,
      title: 'College Search',
      description: 'Discover top colleges and universities with detailed information about courses, fees, and placements.',
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: 'Career Guidance',
      description: 'Explore career paths, salary insights, and job prospects to make informed decisions about your future.',
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Personalized Recommendations',
      description: 'Get tailored college and career suggestions based on your interests and academic performance.',
    },
    {
      icon: <Award className="h-8 w-8 text-orange-600" />,
      title: 'Expert Insights',
      description: 'Access valuable insights and tips from education experts and industry professionals.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Colleges Listed' },
    { number: '100+', label: 'Career Paths' },
    { number: '10,000+', label: 'Students Guided' },
    { number: '95%', label: 'Success Rate' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your Journey to Success
              <br />
              <span className="text-blue-200">Starts Here</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              Discover the perfect college and career path with Disha - your comprehensive guide to 
              educational opportunities and career success.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for colleges, courses, or careers..."
                  className="w-full px-6 py-4 text-gray-900 text-lg rounded-full border-0 shadow-lg focus:ring-4 focus:ring-blue-300 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Search className="h-6 w-6" />
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/colleges"
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
              >
                Explore Colleges
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/career-guidance"
                className="inline-flex items-center justify-center px-8 py-3 bg-transparent text-white text-lg font-semibold rounded-full border-2 border-white hover:bg-white hover:text-blue-600 transition-colors"
              >
                Career Guidance
              </Link>
              <Link
                to="/career-quiz"
                className="inline-flex items-center justify-center px-8 py-3 bg-green-600 text-white text-lg font-semibold rounded-full hover:bg-green-700 transition-colors shadow-lg"
              >
                Take Career Quiz
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Disha?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide comprehensive tools and insights to help you make the best decisions 
              for your educational and career journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have found their perfect college and career path with Disha.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 text-lg font-semibold rounded-full hover:bg-blue-50 transition-colors shadow-lg"
          >
            Get Started Today
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;