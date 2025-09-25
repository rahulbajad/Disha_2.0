import React, { useState } from 'react';
import { useData } from '../contexts/DataContext';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  DollarSign, 
  BookOpen, 
  Users, 
  Search,
  Filter,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Target
} from 'lucide-react';

const CareerGuidance: React.FC = () => {
  const { getCareerPaths } = useData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const careerPaths = getCareerPaths();
  
  const categories = [
    { id: 'all', name: 'All Careers' },
    { id: 'technology', name: 'Technology' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'business', name: 'Business' },
    { id: 'creative', name: 'Creative' },
    { id: 'education', name: 'Education' },
  ];

  const filteredCareers = careerPaths.filter(career => {
    const matchesSearch = career.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         career.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || 
                           career.title.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const formatSalary = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Career Guidance & Pathways
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Explore diverse career opportunities, understand skill requirements, and discover 
            your perfect career path with detailed insights and salary information.
          </p>
          
          {/* CTA for Career Quiz */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 mb-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-2">Not sure which career suits you?</h3>
            <p className="text-blue-100 mb-4">
              Take our comprehensive career interest quiz to get personalized recommendations
            </p>
            <Link
              to="/career-quiz"
              className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              <Target className="h-5 w-5 mr-2" />
              Take Career Quiz
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search careers by title or description..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Career Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Briefcase className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">{careerPaths.length}+</div>
            <div className="text-gray-600 text-sm">Career Paths</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">15%</div>
            <div className="text-gray-600 text-sm">Avg. Growth Rate</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <DollarSign className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">₹8L+</div>
            <div className="text-gray-600 text-sm">Avg. Starting Salary</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <Users className="h-8 w-8 text-orange-600 mx-auto mb-3" />
            <div className="text-2xl font-bold text-gray-900 mb-1">10K+</div>
            <div className="text-gray-600 text-sm">Students Guided</div>
          </div>
        </div>

        {/* Career Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredCareers.map((career) => (
            <div key={career.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{career.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {career.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                      +{career.industryGrowth}% Growth
                    </div>
                  </div>
                </div>

                {/* Salary Information */}
                <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Entry Level</div>
                    <div className="font-semibold text-gray-900">
                      {formatSalary(career.averageSalary.entry)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Mid Level</div>
                    <div className="font-semibold text-gray-900">
                      {formatSalary(career.averageSalary.mid)}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-1">Senior Level</div>
                    <div className="font-semibold text-gray-900">
                      {formatSalary(career.averageSalary.senior)}
                    </div>
                  </div>
                </div>

                {/* Required Skills */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Required Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.requiredSkills.slice(0, 4).map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {career.requiredSkills.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                        +{career.requiredSkills.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Education Path */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Education Path:</h4>
                  <div className="flex flex-wrap gap-2">
                    {career.educationPath.slice(0, 2).map((path, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                      >
                        {path}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Job Prospects */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      <span>{career.jobProspects}</span>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCareers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No careers found</h3>
            <p className="text-gray-600">
              Try adjusting your search terms or filters to find more results.
            </p>
          </div>
        )}

        {/* Additional Resources */}
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Guidance?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our career counselors are here to help you make informed decisions about your future. 
            Get personalized advice based on your interests, skills, and goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/career-quiz"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <Target className="h-5 w-5 mr-2" />
              Take Career Assessment
            </Link>
            <button className="inline-flex items-center justify-center px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors">
              <Users className="h-5 w-5 mr-2" />
              Talk to Counselor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerGuidance;