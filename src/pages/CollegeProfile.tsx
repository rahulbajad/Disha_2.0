import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useData } from '../contexts/DataContext';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  GraduationCap, 
  Award,
  CheckCircle,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';

const CollegeProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getCollegeById } = useData();
  
  const college = id ? getCollegeById(id) : null;

  if (!college) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">College Not Found</h2>
          <Link 
            to="/colleges" 
            className="text-blue-600 hover:text-blue-800 underline"
          >
            Back to Colleges
          </Link>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-64 md:h-80">
        <img
          src={college.imageUrl}
          alt={college.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute bottom-4 left-4">
          <Link
            to="/colleges"
            className="inline-flex items-center text-white hover:text-blue-200 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Colleges
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">
            {college.name}
          </h1>
          <div className="flex items-center text-white text-sm md:text-base">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{college.location}, {college.state}</span>
          </div>
        </div>
        <div className="absolute top-4 right-4">
          <div className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
            Rank #{college.ranking}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {college.description}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Established</div>
                  <div className="font-semibold">{college.established}</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <Users className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Type</div>
                  <div className="font-semibold">{college.type}</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Courses</div>
                  <div className="font-semibold">{college.courses.length}+</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Award className="h-6 w-6 text-orange-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="font-semibold">4.{Math.floor(Math.random() * 5) + 3}/5</div>
                </div>
              </div>
            </div>

            {/* Courses Offered */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Courses Offered</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {college.courses.map((course, index) => (
                  <div key={index} className="flex items-center p-3 border border-gray-200 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium">{course}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admission Process */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Admission Process</h2>
              <div className="space-y-3">
                {college.admissionProcess.map((step, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-4 mt-1">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{step}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Facilities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {college.facilities.map((facility, index) => (
                  <div key={index} className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">{facility}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Fees */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Fee Structure</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">Undergraduate</span>
                  <span className="font-bold text-blue-600">
                    {formatCurrency(college.fees.undergraduate)}
                  </span>
                </div>
                <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                  <span className="font-medium">Postgraduate</span>
                  <span className="font-bold text-green-600">
                    {formatCurrency(college.fees.postgraduate)}
                  </span>
                </div>
              </div>
            </div>

            {/* Placement Statistics */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Placement Statistics</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">Placement Rate</span>
                    <span className="font-semibold">{college.placements.placementRate}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${college.placements.placementRate}%` }}
                    />
                  </div>
                </div>
                <div className="pt-2 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-600">Average Package</span>
                    <span className="font-semibold">
                      {formatCurrency(college.placements.averagePackage)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Highest Package</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(college.placements.highestPackage)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Location</h3>
              <div className="h-48 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <MapPin className="h-8 w-8 mx-auto mb-2" />
                  <p className="text-sm">Interactive map will load here</p>
                  <p className="text-xs">Google Maps integration</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <div className="flex items-center mb-1">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{college.location}, {college.state}</span>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  <span>View on Google Maps</span>
                </button>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-6 text-center">
              <h3 className="text-lg font-bold mb-2">Interested in this college?</h3>
              <p className="text-blue-100 text-sm mb-4">
                Get personalized guidance and application assistance.
              </p>
              <button className="w-full bg-white text-blue-600 font-semibold py-2 rounded-lg hover:bg-blue-50 transition-colors">
                Get Guidance
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;