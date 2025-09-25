const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateAdmin } = require('../middleware/auth');
const router = express.Router();

// Mock student data - In production, this would come from your database
const mockStudentData = [
  {
    id: 'STU001',
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    signupDate: '2024-01-15',
    quizResults: {
      topInterests: ['Investigative (Thinkers)', 'Realistic (Doers)'],
      completedDate: '2024-01-20',
      recommendedCareers: ['Software Developer', 'Data Scientist', 'Mechanical Engineer']
    },
    academicLevel: 'Undergraduate Student',
    interests: ['Technology', 'Engineering', 'Science']
  },
  {
    id: 'STU002',
    name: 'Priya Patel',
    email: 'priya.patel@email.com',
    signupDate: '2024-01-18',
    quizResults: {
      topInterests: ['Social (Helpers)', 'Artistic (Creators)'],
      completedDate: '2024-01-22',
      recommendedCareers: ['UI/UX Designer', 'School Counselor', 'Social Worker']
    },
    academicLevel: 'Senior Secondary (12th Grade)',
    interests: ['Arts', 'Design', 'Psychology']
  },
  {
    id: 'STU003',
    name: 'Rohit Kumar',
    email: 'rohit.kumar@email.com',
    signupDate: '2024-01-20',
    quizResults: {
      topInterests: ['Enterprising (Persuaders)', 'Conventional (Organizers)'],
      completedDate: '2024-01-25',
      recommendedCareers: ['Marketing Manager', 'Financial Analyst', 'Project Manager']
    },
    academicLevel: 'Undergraduate Student',
    interests: ['Business', 'Finance', 'Marketing']
  },
  {
    id: 'STU004',
    name: 'Sneha Reddy',
    email: 'sneha.reddy@email.com',
    signupDate: '2024-01-22',
    quizResults: {
      topInterests: ['Investigative (Thinkers)', 'Social (Helpers)'],
      completedDate: '2024-01-28',
      recommendedCareers: ['Medical Doctor', 'Research Scientist', 'Psychologist']
    },
    academicLevel: 'High School (10th Grade)',
    interests: ['Medicine', 'Science', 'Research']
  },
  {
    id: 'STU005',
    name: 'Vikram Singh',
    email: 'vikram.singh@email.com',
    signupDate: '2024-01-25',
    quizResults: {
      topInterests: ['Realistic (Doers)', 'Enterprising (Persuaders)'],
      completedDate: '2024-01-30',
      recommendedCareers: ['Construction Manager', 'Entrepreneur', 'Pilot']
    },
    academicLevel: 'Working Professional',
    interests: ['Construction', 'Business', 'Aviation']
  },
  {
    id: 'STU006',
    name: 'Ananya Gupta',
    email: 'ananya.gupta@email.com',
    signupDate: '2024-02-01',
    quizResults: {
      topInterests: ['Artistic (Creators)', 'Investigative (Thinkers)'],
      completedDate: '2024-02-05',
      recommendedCareers: ['Architect', 'Graphic Designer', 'Software Developer']
    },
    academicLevel: 'Undergraduate Student',
    interests: ['Architecture', 'Design', 'Technology']
  },
  {
    id: 'STU007',
    name: 'Karan Mehta',
    email: 'karan.mehta@email.com',
    signupDate: '2024-02-03',
    quizResults: null, // Student hasn't taken the quiz yet
    academicLevel: 'Senior Secondary (12th Grade)',
    interests: ['Sports', 'Business']
  },
  {
    id: 'STU008',
    name: 'Riya Joshi',
    email: 'riya.joshi@email.com',
    signupDate: '2024-02-05',
    quizResults: {
      topInterests: ['Social (Helpers)', 'Conventional (Organizers)'],
      completedDate: '2024-02-08',
      recommendedCareers: ['Human Resources Manager', 'Teacher', 'Operations Manager']
    },
    academicLevel: 'Graduate Student',
    interests: ['Education', 'Management', 'Human Resources']
  }
];

// POST /api/admin/login
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check credentials against environment variables
    const adminUser = process.env.ADMIN_USER || 'Rahul_bajad';
    const adminPass = process.env.ADMIN_PASS || '8010779357';

    if (username !== adminUser || password !== adminPass) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        username: adminUser,
        role: 'admin',
        loginTime: new Date().toISOString()
      },
      process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-this-in-production',
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      token,
      message: 'Login successful',
      admin: {
        username: adminUser,
        role: 'admin'
      }
    });

  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
});

// GET /api/admin/student-data (Protected route)
router.get('/student-data', authenticateAdmin, (req, res) => {
  try {
    // In production, this would query your actual database
    // For now, we're returning mock data with realistic student information
    
    const studentsWithStats = mockStudentData.map(student => ({
      ...student,
      quizStatus: student.quizResults ? 'Completed' : 'Pending',
      totalInterests: student.interests.length,
      lastActivity: student.quizResults?.completedDate || student.signupDate
    }));

    // Add summary statistics
    const summary = {
      totalStudents: mockStudentData.length,
      quizCompleted: mockStudentData.filter(s => s.quizResults).length,
      quizPending: mockStudentData.filter(s => !s.quizResults).length,
      academicLevels: {
        'High School (10th Grade)': mockStudentData.filter(s => s.academicLevel === 'High School (10th Grade)').length,
        'Senior Secondary (12th Grade)': mockStudentData.filter(s => s.academicLevel === 'Senior Secondary (12th Grade)').length,
        'Undergraduate Student': mockStudentData.filter(s => s.academicLevel === 'Undergraduate Student').length,
        'Graduate Student': mockStudentData.filter(s => s.academicLevel === 'Graduate Student').length,
        'Working Professional': mockStudentData.filter(s => s.academicLevel === 'Working Professional').length
      }
    };

    res.json({
      success: true,
      data: studentsWithStats,
      summary,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching student data:', error);
    res.status(500).json({ error: 'Internal server error while fetching student data' });
  }
});

// GET /api/admin/dashboard-stats (Protected route)
router.get('/dashboard-stats', authenticateAdmin, (req, res) => {
  try {
    const stats = {
      totalStudents: mockStudentData.length,
      newStudentsThisMonth: mockStudentData.filter(s => {
        const signupDate = new Date(s.signupDate);
        const currentMonth = new Date().getMonth();
        return signupDate.getMonth() === currentMonth;
      }).length,
      quizCompletionRate: Math.round((mockStudentData.filter(s => s.quizResults).length / mockStudentData.length) * 100),
      topInterestCategories: {
        'Investigative (Thinkers)': 3,
        'Social (Helpers)': 3,
        'Realistic (Doers)': 2,
        'Artistic (Creators)': 2,
        'Enterprising (Persuaders)': 2,
        'Conventional (Organizers)': 2
      }
    };

    res.json({
      success: true,
      stats,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ error: 'Internal server error while fetching dashboard stats' });
  }
});

module.exports = router;