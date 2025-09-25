const express = require('express');
const router = express.Router();

// Holland Codes (RIASEC) career mapping
const careerDatabase = {
  R: [
    { name: 'Mechanical Engineer', description: 'Design and develop mechanical systems and devices', categories: ['R', 'I'] },
    { name: 'Construction Manager', description: 'Oversee construction projects from planning to completion', categories: ['R', 'E'] },
    { name: 'Automotive Technician', description: 'Diagnose and repair vehicle systems and components', categories: ['R'] },
    { name: 'Electrician', description: 'Install and maintain electrical systems in buildings and equipment', categories: ['R'] },
    { name: 'Carpenter', description: 'Build and repair structures made of wood and other materials', categories: ['R'] },
    { name: 'Pilot', description: 'Operate aircraft for transportation or commercial purposes', categories: ['R', 'E'] }
  ],
  I: [
    { name: 'Data Scientist', description: 'Analyze complex data to help organizations make decisions', categories: ['I', 'C'] },
    { name: 'Research Scientist', description: 'Conduct research to advance knowledge in various fields', categories: ['I'] },
    { name: 'Software Developer', description: 'Design and create computer programs and applications', categories: ['I', 'A'] },
    { name: 'Medical Doctor', description: 'Diagnose and treat illnesses and injuries in patients', categories: ['I', 'S'] },
    { name: 'Psychologist', description: 'Study human behavior and mental processes', categories: ['I', 'S'] },
    { name: 'Mathematician', description: 'Use mathematical theories and techniques to solve problems', categories: ['I'] }
  ],
  A: [
    { name: 'UI/UX Designer', description: 'Create user-friendly and visually appealing digital interfaces', categories: ['A', 'I'] },
    { name: 'Graphic Designer', description: 'Create visual concepts to communicate ideas and messages', categories: ['A'] },
    { name: 'Architect', description: 'Design buildings and structures that are functional and aesthetic', categories: ['A', 'R'] },
    { name: 'Writer/Author', description: 'Create written content for books, articles, and other media', categories: ['A'] },
    { name: 'Musician', description: 'Compose, perform, or teach music professionally', categories: ['A'] },
    { name: 'Film Director', description: 'Oversee the creative aspects of film production', categories: ['A', 'E'] }
  ],
  S: [
    { name: 'School Counselor', description: 'Help students with academic, career, and personal development', categories: ['S'] },
    { name: 'Social Worker', description: 'Help individuals and families cope with challenges in their lives', categories: ['S'] },
    { name: 'Human Resources Manager', description: 'Oversee recruitment, training, and employee relations', categories: ['S', 'E'] },
    { name: 'Nurse', description: 'Provide medical care and support to patients in healthcare settings', categories: ['S', 'I'] },
    { name: 'Teacher', description: 'Educate students in various subjects and grade levels', categories: ['S'] },
    { name: 'Therapist', description: 'Help people overcome mental health challenges and improve wellbeing', categories: ['S', 'I'] }
  ],
  E: [
    { name: 'Marketing Manager', description: 'Develop and implement marketing strategies to promote products', categories: ['E', 'A'] },
    { name: 'Sales Manager', description: 'Lead sales teams and develop strategies to increase revenue', categories: ['E'] },
    { name: 'Entrepreneur', description: 'Start and manage your own business ventures', categories: ['E', 'R'] },
    { name: 'Lawyer', description: 'Represent clients in legal matters and provide legal advice', categories: ['E', 'I'] },
    { name: 'Real Estate Agent', description: 'Help clients buy, sell, and rent properties', categories: ['E', 'S'] },
    { name: 'Investment Banker', description: 'Help companies and governments raise capital through securities', categories: ['E', 'C'] }
  ],
  C: [
    { name: 'Financial Analyst', description: 'Analyze financial data to guide business investment decisions', categories: ['C', 'I'] },
    { name: 'Project Manager', description: 'Plan, execute, and oversee projects to ensure successful completion', categories: ['C', 'E'] },
    { name: 'Database Administrator', description: 'Manage and maintain database systems for organizations', categories: ['C', 'I'] },
    { name: 'Accountant', description: 'Prepare and examine financial records and tax documents', categories: ['C'] },
    { name: 'Quality Assurance Analyst', description: 'Test products and systems to ensure they meet quality standards', categories: ['C', 'I'] },
    { name: 'Operations Manager', description: 'Oversee daily operations and improve organizational efficiency', categories: ['C', 'E'] }
  ]
};

const categoryNames = {
  R: 'Realistic (Doers)',
  I: 'Investigative (Thinkers)',
  A: 'Artistic (Creators)',
  S: 'Social (Helpers)',
  E: 'Enterprising (Persuaders)',
  C: 'Conventional (Organizers)'
};

// POST /api/quiz-results
router.post('/quiz-results', (req, res) => {
  try {
    const { answers } = req.body;

    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        error: 'Invalid request. Answers array is required.'
      });
    }

    // Calculate scores for each RIASEC category
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    
    answers.forEach(answer => {
      if (scores.hasOwnProperty(answer)) {
        scores[answer]++;
      }
    });

    // Get top 2-3 categories (sorted by score, descending)
    const sortedCategories = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .filter(([,score]) => score > 0);

    const topCategories = sortedCategories.map(([category]) => category);

    // Generate career recommendations based on top categories
    const recommendedCareers = [];
    const addedCareers = new Set();

    // First, add careers that match multiple top categories
    topCategories.forEach(primaryCategory => {
      careerDatabase[primaryCategory].forEach(career => {
        if (!addedCareers.has(career.name)) {
          // Calculate match score based on how many top categories this career matches
          const matchScore = career.categories.filter(cat => topCategories.includes(cat)).length;
          recommendedCareers.push({
            ...career,
            matchScore,
            primaryCategory
          });
          addedCareers.add(career.name);
        }
      });
    });

    // Sort by match score (careers matching multiple categories first)
    recommendedCareers.sort((a, b) => b.matchScore - a.matchScore);

    // Prepare response
    const result = {
      scores,
      topCategories: topCategories.map(cat => categoryNames[cat]),
      recommendedCareers: recommendedCareers.slice(0, 8).map(career => ({
        name: career.name,
        description: career.description,
        categories: career.categories,
        matchScore: career.matchScore
      })),
      analysis: {
        dominantType: categoryNames[topCategories[0]],
        secondaryType: topCategories[1] ? categoryNames[topCategories[1]] : null,
        totalQuestions: answers.length,
        responseDistribution: scores
      }
    };

    res.json(result);

  } catch (error) {
    console.error('Error processing quiz results:', error);
    res.status(500).json({
      error: 'Internal server error while processing quiz results.'
    });
  }
});

// GET /api/quiz-questions (optional endpoint to serve questions)
router.get('/quiz-questions', (req, res) => {
  const questions = [
    {
      id: 1,
      question: "Which activity sounds most appealing to you?",
      options: [
        { text: "Building or repairing something with your hands", category: 'R' },
        { text: "Conducting a scientific experiment", category: 'I' },
        { text: "Creating a piece of art or music", category: 'A' },
        { text: "Teaching someone a new skill", category: 'S' },
        { text: "Leading a team project", category: 'E' },
        { text: "Organizing files and data systematically", category: 'C' }
      ]
    },
    {
      id: 2,
      question: "In your ideal work environment, you would prefer to:",
      options: [
        { text: "Work outdoors or in a workshop", category: 'R' },
        { text: "Work in a laboratory or research facility", category: 'I' },
        { text: "Work in a creative studio or flexible space", category: 'A' },
        { text: "Work directly with people in a community setting", category: 'S' },
        { text: "Work in a dynamic office with networking opportunities", category: 'E' },
        { text: "Work in a structured office with clear procedures", category: 'C' }
      ]
    },
    // Add more questions as needed...
  ];

  res.json({ questions });
});

module.exports = router;