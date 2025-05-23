# Python Quiz Challenge

A web-based multiple-choice quiz application designed to test your knowledge of the Python programming language. Built with Flask and vanilla JavaScript, and optimized for deployment on Vercel.

![Python Quiz](https://img.shields.io/badge/Python-Quiz-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-3.0.3-000000?style=for-the-badge&logo=flask&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-Deployment-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Features

- 20+ Python-related multiple-choice questions (expandable to 50+)
- Python-themed design with blue and yellow color scheme
- Interactive gameplay with immediate feedback
- Detailed explanations for each answer
- Responsive design that works on mobile and desktop
- Serverless architecture for easy deployment

## Live Demo

Visit the live application: [Python Quiz Challenge](https://quiz-ketankshukla.vercel.app/)

## Project Structure

```
quiz/
├── docs/                   # Documentation
│   ├── USER_GUIDE.md       # Guide for users
│   └── DEVELOPER_GUIDE.md  # Guide for developers
├── public/                 # Static files
│   ├── index.html          # Main HTML page
│   ├── script.js           # Client-side JavaScript
│   └── style.css           # CSS styles
├── index.py                # Flask application
├── questions.json          # Quiz questions data
├── requirements.txt        # Python dependencies
├── vercel.json             # Vercel configuration
└── README.md               # This file
```

## Documentation

- [User Guide](docs/USER_GUIDE.md) - Instructions for using the quiz application
- [Developer Guide](docs/DEVELOPER_GUIDE.md) - Guide for setting up and deploying Flask apps on Vercel

## Quick Start

### Prerequisites

- Python 3.9 or higher
- Git

### Local Development

1. Clone the repository:
   ```
   git clone https://github.com/ketankshukla/quiz.git
   cd quiz
   ```

2. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

3. Run the application:
   ```
   python index.py
   ```

4. Open your browser and navigate to:
   ```
   http://127.0.0.1:5000/
   ```

## Deployment

This application is configured for easy deployment to Vercel. See the [Developer Guide](docs/DEVELOPER_GUIDE.md) for detailed deployment instructions.

## Adding More Questions

To add more questions to the quiz:

1. Open `questions.json`
2. Add new question objects following the existing format:
   ```json
   {
     "id": UNIQUE_NUMBER,
     "question": "Your question text here?",
     "options": ["Option A", "Option B", "Option C", "Option D"],
     "answer": "The correct option text here",
     "explanation": "A brief explanation of why this is the correct answer."
   }
   ```

## License

MIT

## Acknowledgements

- [Flask](https://flask.palletsprojects.com/) - The web framework used
- [Vercel](https://vercel.com/) - Deployment platform
