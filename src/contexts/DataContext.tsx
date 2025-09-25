import React, { createContext, useContext, useState, ReactNode } from 'react';

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  type: string;
  ranking: number;
  established: number;
  courses: string[];
  fees: {
    undergraduate: number;
    postgraduate: number;
  };
  admissionProcess: string[];
  placements: {
    averagePackage: number;
    highestPackage: number;
    placementRate: number;
  };
  facilities: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl: string;
  description: string;
}

interface CareerPath {
  id: string;
  title: string;
  description: string;
  requiredSkills: string[];
  averageSalary: {
    entry: number;
    mid: number;
    senior: number;
  };
  jobProspects: string;
  educationPath: string[];
  relatedCourses: string[];
  industryGrowth: number;
}

interface DataContextType {
  colleges: College[];
  careerPaths: CareerPath[];
  searchColleges: (query: string, filters: any) => College[];
  getCollegeById: (id: string) => College | undefined;
  getCareerPaths: () => CareerPath[];
}

const DataContext = createContext<DataContextType>({} as DataContextType);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

interface DataProviderProps {
  children: ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [colleges] = useState<College[]>([
    {
      id: '1',
      name: 'Indian Institute of Technology Delhi',
      location: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      ranking: 2,
      established: 1961,
      courses: ['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering'],
      fees: { undergraduate: 200000, postgraduate: 250000 },
      admissionProcess: ['JEE Advanced', 'Counselling', 'Document Verification'],
      placements: { averagePackage: 1200000, highestPackage: 5000000, placementRate: 95 },
      facilities: ['Hostel', 'Library', 'Sports Complex', 'Research Labs'],
      coordinates: { lat: 28.5449, lng: 77.1931 },
      imageUrl: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg',
      description: 'IIT Delhi is one of the premier engineering institutions in India, known for its excellence in technical education and research.',
    },
    {
      id: '2',
      name: 'University of Delhi',
      location: 'New Delhi',
      state: 'Delhi',
      type: 'Government',
      ranking: 12,
      established: 1922,
      courses: ['Economics', 'English', 'Mathematics', 'Physics', 'Commerce'],
      fees: { undergraduate: 15000, postgraduate: 25000 },
      admissionProcess: ['CUET', 'Merit-based Selection', 'Document Verification'],
      placements: { averagePackage: 600000, highestPackage: 2500000, placementRate: 85 },
      facilities: ['Multiple Colleges', 'Central Library', 'Sports Facilities', 'Cultural Centers'],
      coordinates: { lat: 28.6906, lng: 77.2136 },
      imageUrl: 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg',
      description: 'University of Delhi is a premier university in India, offering diverse undergraduate and postgraduate programs.',
    },
    {
      id: '3',
      name: 'Indian Institute of Management Bangalore',
      location: 'Bangalore',
      state: 'Karnataka',
      type: 'Government',
      ranking: 3,
      established: 1973,
      courses: ['MBA', 'Executive MBA', 'PhD in Management'],
      fees: { undergraduate: 0, postgraduate: 2400000 },
      admissionProcess: ['CAT', 'Written Ability Test', 'Personal Interview'],
      placements: { averagePackage: 2800000, highestPackage: 6700000, placementRate: 100 },
      facilities: ['Hostels', 'Library', 'Computer Center', 'Sports Complex'],
      coordinates: { lat: 12.9375, lng: 77.6054 },
      imageUrl: 'https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg',
      description: 'IIM Bangalore is one of the top business schools in India, known for its rigorous MBA program and excellent placements.',
    },
  ]);

  const [careerPaths] = useState<CareerPath[]>([
    {
      id: '1',
      title: 'Software Engineer',
      description: 'Design, develop, and maintain software applications and systems.',
      requiredSkills: ['Programming Languages', 'Problem Solving', 'System Design', 'Database Management'],
      averageSalary: { entry: 500000, mid: 1200000, senior: 2500000 },
      jobProspects: 'Excellent growth prospects with high demand across industries.',
      educationPath: ['Bachelor\'s in Computer Science/IT', 'Relevant Certifications', 'Continuous Learning'],
      relatedCourses: ['Computer Science', 'Information Technology', 'Software Engineering'],
      industryGrowth: 15,
    },
    {
      id: '2',
      title: 'Data Scientist',
      description: 'Analyze complex data to help organizations make data-driven decisions.',
      requiredSkills: ['Statistics', 'Machine Learning', 'Python/R', 'Data Visualization'],
      averageSalary: { entry: 600000, mid: 1500000, senior: 3000000 },
      jobProspects: 'High demand with excellent career growth in the digital age.',
      educationPath: ['Bachelor\'s in Math/Statistics/CS', 'Master\'s in Data Science', 'Specialized Certifications'],
      relatedCourses: ['Data Science', 'Statistics', 'Computer Science', 'Mathematics'],
      industryGrowth: 22,
    },
    {
      id: '3',
      title: 'Digital Marketing Specialist',
      description: 'Create and manage online marketing campaigns to promote brands and products.',
      requiredSkills: ['SEO/SEM', 'Social Media Marketing', 'Content Creation', 'Analytics'],
      averageSalary: { entry: 350000, mid: 800000, senior: 1800000 },
      jobProspects: 'Growing field with opportunities across all industries.',
      educationPath: ['Bachelor\'s in Marketing/Communications', 'Digital Marketing Certifications', 'Practical Experience'],
      relatedCourses: ['Marketing', 'Communications', 'Business Administration', 'Mass Media'],
      industryGrowth: 18,
    },
  ]);

  const searchColleges = (query: string, filters: any) => {
    let filteredColleges = colleges;

    if (query) {
      filteredColleges = filteredColleges.filter(college =>
        college.name.toLowerCase().includes(query.toLowerCase()) ||
        college.location.toLowerCase().includes(query.toLowerCase()) ||
        college.courses.some(course => course.toLowerCase().includes(query.toLowerCase()))
      );
    }

    if (filters.state) {
      filteredColleges = filteredColleges.filter(college =>
        college.state === filters.state
      );
    }

    if (filters.type) {
      filteredColleges = filteredColleges.filter(college =>
        college.type === filters.type
      );
    }

    if (filters.sortBy === 'ranking') {
      filteredColleges.sort((a, b) => a.ranking - b.ranking);
    } else if (filters.sortBy === 'fees') {
      filteredColleges.sort((a, b) => a.fees.undergraduate - b.fees.undergraduate);
    }

    return filteredColleges;
  };

  const getCollegeById = (id: string) => {
    return colleges.find(college => college.id === id);
  };

  const getCareerPaths = () => {
    return careerPaths;
  };

  const value = {
    colleges,
    careerPaths,
    searchColleges,
    getCollegeById,
    getCareerPaths,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};