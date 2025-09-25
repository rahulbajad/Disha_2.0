# Disha Career Interest Quiz

A comprehensive career interest quiz based on the Holland Codes (RIASEC) model to help students discover their ideal career paths.

## Features

### Frontend (React.js)
- **Multi-step Quiz Interface**: Clean, engaging UI with one question at a time
- **Progress Tracking**: Visual progress bar showing completion status
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Interactive Results**: Detailed results page with career recommendations
- **Smooth Animations**: Loading states and transitions for better UX

### Backend (Node.js + Express)
- **RIASEC Scoring System**: Implements Holland Codes model for accurate career matching
- **RESTful API**: Clean API endpoints for quiz processing
- **Career Database**: Comprehensive database of careers mapped to RIASEC categories
- **Smart Recommendations**: Algorithm that matches careers based on multiple category combinations

## Holland Codes (RIASEC) Model

The quiz is based on John Holland's theory of career choice, which categorizes people into six personality types:

1. **Realistic (R) - Doers**: Prefer hands-on, practical activities
2. **Investigative (I) - Thinkers**: Enjoy research, analysis, and problem-solving
3. **Artistic (A) - Creators**: Value creativity, self-expression, and innovation
4. **Social (S) - Helpers**: Prefer working with and helping people
5. **Enterprising (E) - Persuaders**: Enjoy leadership, sales, and business activities
6. **Conventional (C) - Organizers**: Prefer structured, detail-oriented tasks

## API Endpoints

### POST /api/quiz-results
Processes quiz answers and returns career recommendations.

**Request Body:**
```json
{
  "answers": ["R", "I", "A", "S", "E", "C", "R", "I", "A", "S", "E", "C"]
}
```

**Response:**
```json
{
  "scores": {
    "R": 2,
    "I": 2,
    "A": 2,
    "S": 2,
    "E": 2,
    "C": 2
  },
  "topCategories": [
    "Realistic (Doers)",
    "Investigative (Thinkers)",
    "Artistic (Creators)"
  ],
  "recommendedCareers": [
    {
      "name": "UI/UX Designer",
      "description": "Create user-friendly and visually appealing digital interfaces",
      "categories": ["A", "I"],
      "matchScore": 2
    }
  ],
  "analysis": {
    "dominantType": "Realistic (Doers)",
    "secondaryType": "Investigative (Thinkers)",
    "totalQuestions": 12,
    "responseDistribution": {
      "R": 2,
      "I": 2,
      "A": 2,
      "S": 2,
      "E": 2,
      "C": 2
    }
  }
}
```

### GET /api/quiz-questions
Returns the quiz questions (optional endpoint).

## Installation & Setup

### Frontend
The quiz component is already integrated into the main Disha application. Access it at `/career-quiz`.

### Backend
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. The API will be available at `http://localhost:5000`

## Usage

1. **Taking the Quiz**: Users answer 12 multiple-choice questions about their interests and work preferences
2. **Processing**: The backend calculates scores for each RIASEC category
3. **Results**: Users receive personalized career recommendations based on their top categories
4. **Integration**: Results can be saved to user profiles for future reference

## Career Database

The system includes a comprehensive database of careers mapped to RIASEC categories:

- **Realistic**: Mechanical Engineer, Construction Manager, Automotive Technician, etc.
- **Investigative**: Data Scientist, Research Scientist, Software Developer, etc.
- **Artistic**: UI/UX Designer, Graphic Designer, Architect, etc.
- **Social**: School Counselor, Social Worker, Human Resources Manager, etc.
- **Enterprising**: Marketing Manager, Sales Manager, Entrepreneur, etc.
- **Conventional**: Financial Analyst, Project Manager, Database Administrator, etc.

## Technical Implementation

### Scoring Algorithm
1. Each answer adds 1 point to the corresponding RIASEC category
2. Categories are ranked by total score
3. Top 2-3 categories are used for career matching
4. Careers matching multiple top categories are prioritized

### Career Matching
- Careers are tagged with one or more RIASEC categories
- Match score is calculated based on category overlap
- Results are sorted by relevance and match score
- Up to 8 career recommendations are returned

## Future Enhancements

- **Detailed Career Information**: Integration with job market data and salary information
- **Personalized Learning Paths**: Educational recommendations based on career choices
- **Progress Tracking**: Save and compare quiz results over time
- **Advanced Analytics**: Detailed personality insights and career fit analysis
- **Integration with College Database**: Match careers with relevant college programs

## Contributing

To add new careers or modify the scoring algorithm:

1. Update the `careerDatabase` object in `server/routes/quiz.js`
2. Ensure careers are properly categorized with RIASEC codes
3. Test the API endpoint with various answer combinations
4. Update the frontend if new career fields are added

## License

This project is part of the Disha educational guidance platform and follows the same licensing terms.