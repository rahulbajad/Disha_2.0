import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Brain, CheckCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: {
    text: string;
    category: 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
  }[];
}

interface QuizResult {
  topCategories: string[];
  scores: Record<string, number>;
  recommendedCareers: {
    name: string;
    description: string;
    categories: string[];
  }[];
}

const CareerQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [results, setResults] = useState<QuizResult | null>(null);

  const questions: Question[] = [
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
    {
      id: 3,
      question: "Which task sounds most interesting to you?",
      options: [
        { text: "Building a computer from scratch", category: 'R' },
        { text: "Analyzing data to find trends and patterns", category: 'I' },
        { text: "Designing a website or creating digital art", category: 'A' },
        { text: "Volunteering to help at a local school", category: 'S' },
        { text: "Starting your own business", category: 'E' },
        { text: "Managing budgets and financial records", category: 'C' }
      ]
    },
    {
      id: 4,
      question: "What motivates you most in your work?",
      options: [
        { text: "Seeing tangible results from your efforts", category: 'R' },
        { text: "Solving complex problems and discovering new knowledge", category: 'I' },
        { text: "Expressing creativity and originality", category: 'A' },
        { text: "Helping others and making a positive impact", category: 'S' },
        { text: "Achieving goals and gaining recognition", category: 'E' },
        { text: "Following established procedures and maintaining order", category: 'C' }
      ]
    },
    {
      id: 5,
      question: "Which subject did you enjoy most in school?",
      options: [
        { text: "Shop class, engineering, or physical education", category: 'R' },
        { text: "Science, mathematics, or research projects", category: 'I' },
        { text: "Art, music, creative writing, or drama", category: 'A' },
        { text: "Psychology, sociology, or volunteer activities", category: 'S' },
        { text: "Business studies, debate, or student government", category: 'E' },
        { text: "Accounting, computer applications, or administrative tasks", category: 'C' }
      ]
    },
    {
      id: 6,
      question: "How do you prefer to solve problems?",
      options: [
        { text: "Through hands-on experimentation and practical testing", category: 'R' },
        { text: "Through research, analysis, and logical reasoning", category: 'I' },
        { text: "Through creative brainstorming and innovative approaches", category: 'A' },
        { text: "Through collaboration and seeking input from others", category: 'S' },
        { text: "Through quick decision-making and taking action", category: 'E' },
        { text: "Through systematic analysis and following proven methods", category: 'C' }
      ]
    },
    {
      id: 7,
      question: "What type of recognition do you value most?",
      options: [
        { text: "Recognition for practical skills and craftsmanship", category: 'R' },
        { text: "Recognition for intellectual achievements and discoveries", category: 'I' },
        { text: "Recognition for creativity and artistic expression", category: 'A' },
        { text: "Recognition for helping others and community service", category: 'S' },
        { text: "Recognition for leadership and business success", category: 'E' },
        { text: "Recognition for accuracy and attention to detail", category: 'C' }
      ]
    },
    {
      id: 8,
      question: "Which work style describes you best?",
      options: [
        { text: "Prefer working with tools, machines, or physical materials", category: 'R' },
        { text: "Prefer working independently on complex problems", category: 'I' },
        { text: "Prefer working on projects that allow creative freedom", category: 'A' },
        { text: "Prefer working in teams and helping colleagues", category: 'S' },
        { text: "Prefer working in competitive, goal-oriented environments", category: 'E' },
        { text: "Prefer working with clear guidelines and structured tasks", category: 'C' }
      ]
    },
    {
      id: 9,
      question: "What kind of challenges excite you most?",
      options: [
        { text: "Technical challenges that require practical solutions", category: 'R' },
        { text: "Intellectual challenges that require deep thinking", category: 'I' },
        { text: "Creative challenges that require innovative ideas", category: 'A' },
        { text: "Social challenges that involve helping people", category: 'S' },
        { text: "Business challenges that require strategic thinking", category: 'E' },
        { text: "Organizational challenges that require systematic approaches", category: 'C' }
      ]
    },
    {
      id: 10,
      question: "In a group project, you naturally tend to:",
      options: [
        { text: "Focus on the practical implementation and execution", category: 'R' },
        { text: "Research and analyze the problem thoroughly", category: 'I' },
        { text: "Come up with creative and original ideas", category: 'A' },
        { text: "Ensure everyone is included and working well together", category: 'S' },
        { text: "Take charge and coordinate the team's efforts", category: 'E' },
        { text: "Organize tasks and keep track of deadlines", category: 'C' }
      ]
    },
    {
      id: 11,
      question: "Which work outcome would make you feel most accomplished?",
      options: [
        { text: "Building something that works perfectly and lasts", category: 'R' },
        { text: "Discovering something new or solving a complex mystery", category: 'I' },
        { text: "Creating something beautiful or meaningful", category: 'A' },
        { text: "Making a positive difference in someone's life", category: 'S' },
        { text: "Achieving a significant business milestone", category: 'E' },
        { text: "Completing a project efficiently and error-free", category: 'C' }
      ]
    },
    {
      id: 12,
      question: "What type of learning do you prefer?",
      options: [
        { text: "Learning through hands-on practice and experience", category: 'R' },
        { text: "Learning through reading, research, and analysis", category: 'I' },
        { text: "Learning through creative exploration and experimentation", category: 'A' },
        { text: "Learning through discussion and collaboration with others", category: 'S' },
        { text: "Learning through real-world application and networking", category: 'E' },
        { text: "Learning through structured courses and step-by-step instruction", category: 'C' }
      ]
    }
  ];

  const categoryNames = {
    R: 'Realistic (Doers)',
    I: 'Investigative (Thinkers)',
    A: 'Artistic (Creators)',
    S: 'Social (Helpers)',
    E: 'Enterprising (Persuaders)',
    C: 'Conventional (Organizers)'
  };

  const categoryDescriptions = {
    R: 'You enjoy working with your hands, tools, and machines. You prefer practical, hands-on activities.',
    I: 'You enjoy working with ideas, theories, and data. You like to analyze, research, and solve complex problems.',
    A: 'You enjoy creative expression, innovation, and working in unstructured environments.',
    S: 'You enjoy helping, teaching, and working with people. You value cooperation and social interaction.',
    E: 'You enjoy leading, persuading, and managing others. You like competitive environments and business challenges.',
    C: 'You enjoy working with data, details, and established procedures. You value accuracy and organization.'
  };

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = questions[currentQuestion].options[selectedOption].category;
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        // Quiz completed, calculate results
        calculateResults(newAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(null);
    }
  };

  const calculateResults = async (finalAnswers: string[]) => {
    setIsCalculating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Calculate scores
    const scores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };
    finalAnswers.forEach(answer => {
      scores[answer as keyof typeof scores]++;
    });

    // Get top 2-3 categories
    const sortedCategories = Object.entries(scores)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .filter(([,score]) => score > 0);

    const topCategories = sortedCategories.map(([category]) => category);

    // Mock career recommendations based on top categories
    const careerDatabase = {
      R: [
        { name: 'Mechanical Engineer', description: 'Design and develop mechanical systems and devices', categories: ['R', 'I'] },
        { name: 'Construction Manager', description: 'Oversee construction projects from planning to completion', categories: ['R', 'E'] },
        { name: 'Automotive Technician', description: 'Diagnose and repair vehicle systems and components', categories: ['R'] }
      ],
      I: [
        { name: 'Data Scientist', description: 'Analyze complex data to help organizations make decisions', categories: ['I', 'C'] },
        { name: 'Research Scientist', description: 'Conduct research to advance knowledge in various fields', categories: ['I'] },
        { name: 'Software Developer', description: 'Design and create computer programs and applications', categories: ['I', 'A'] }
      ],
      A: [
        { name: 'UI/UX Designer', description: 'Create user-friendly and visually appealing digital interfaces', categories: ['A', 'I'] },
        { name: 'Graphic Designer', description: 'Create visual concepts to communicate ideas and messages', categories: ['A'] },
        { name: 'Architect', description: 'Design buildings and structures that are functional and aesthetic', categories: ['A', 'R'] }
      ],
      S: [
        { name: 'School Counselor', description: 'Help students with academic, career, and personal development', categories: ['S'] },
        { name: 'Social Worker', description: 'Help individuals and families cope with challenges in their lives', categories: ['S'] },
        { name: 'Human Resources Manager', description: 'Oversee recruitment, training, and employee relations', categories: ['S', 'E'] }
      ],
      E: [
        { name: 'Marketing Manager', description: 'Develop and implement marketing strategies to promote products', categories: ['E', 'A'] },
        { name: 'Sales Manager', description: 'Lead sales teams and develop strategies to increase revenue', categories: ['E'] },
        { name: 'Entrepreneur', description: 'Start and manage your own business ventures', categories: ['E', 'R'] }
      ],
      C: [
        { name: 'Financial Analyst', description: 'Analyze financial data to guide business investment decisions', categories: ['C', 'I'] },
        { name: 'Project Manager', description: 'Plan, execute, and oversee projects to ensure successful completion', categories: ['C', 'E'] },
        { name: 'Database Administrator', description: 'Manage and maintain database systems for organizations', categories: ['C', 'I'] }
      ]
    };

    // Get recommended careers based on top categories
    const recommendedCareers: { name: string; description: string; categories: string[] }[] = [];
    const addedCareers = new Set<string>();

    topCategories.forEach(category => {
      careerDatabase[category as keyof typeof careerDatabase].forEach(career => {
        if (!addedCareers.has(career.name)) {
          recommendedCareers.push(career);
          addedCareers.add(career.name);
        }
      });
    });

    setResults({
      topCategories: topCategories.map(cat => categoryNames[cat as keyof typeof categoryNames]),
      scores,
      recommendedCareers: recommendedCareers.slice(0, 6)
    });
    
    setIsCalculating(false);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setResults(null);
    setIsCalculating(false);
  };

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100;

  if (isCalculating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Calculating your results...</h2>
          <p className="text-gray-600">Analyzing your responses to find the perfect career matches</p>
        </div>
      </div>
    );
  }

  if (results) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Career Interest Results</h1>
            <p className="text-gray-600">Based on the Holland Codes (RIASEC) model</p>
          </div>

          {/* Top Categories */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Top Interest Areas</h2>
            <div className="space-y-4">
              {results.topCategories.slice(0, 3).map((category, index) => {
                const categoryKey = Object.keys(categoryNames).find(
                  key => categoryNames[key as keyof typeof categoryNames] === category
                ) as keyof typeof categoryNames;
                const score = results.scores[categoryKey];
                const percentage = (score / questions.length) * 100;
                
                return (
                  <div key={category} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{category}</h3>
                      <span className="text-sm font-medium text-blue-600">{score}/{questions.length}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all duration-500" 
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      {categoryDescriptions[categoryKey]}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recommended Careers */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Recommended Career Paths</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.recommendedCareers.map((career, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{career.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{career.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {career.categories.map((cat, catIndex) => (
                      <span 
                        key={catIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {categoryNames[cat as keyof typeof categoryNames].split(' ')[0]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="text-center space-y-4">
            <button
              onClick={resetQuiz}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Take Quiz Again
            </button>
            <div className="text-sm text-gray-600">
              <p>Want to explore these careers further? Check out our <a href="/career-guidance" className="text-blue-600 hover:underline">Career Guidance</a> section.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <Brain className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Career Interest Quiz</h1>
          <p className="text-gray-600">Discover your ideal career path based on your interests and personality</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-blue-600">
              {Math.round(progressPercentage)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionSelect(index)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedOption === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-4 h-4 rounded-full border-2 mr-3 ${
                    selectedOption === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {selectedOption === index && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <span className="text-gray-700">{option.text}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              currentQuestion === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700'
            }`}
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </button>

          <button
            onClick={handleNext}
            disabled={selectedOption === null}
            className={`flex items-center px-6 py-3 rounded-lg font-semibold transition-colors ${
              selectedOption === null
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {currentQuestion === questions.length - 1 ? 'Get Results' : 'Next'}
            {currentQuestion === questions.length - 1 ? (
              <ArrowRight className="h-4 w-4 ml-2" />
            ) : (
              <ChevronRight className="h-4 w-4 ml-2" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CareerQuiz;