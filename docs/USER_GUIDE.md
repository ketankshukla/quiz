# Python Quiz Challenge - User Guide

## 1. Introduction

Welcome to the Python Quiz Challenge! This is a web-based multiple-choice quiz application designed to test your knowledge of the Python programming language. It features a clean interface, immediate feedback on answers, and a final score to track your progress.

## 2. Features

*   **Multiple-Choice Questions**: A series of questions about Python, each with four possible answers.
*   **Python-Themed Design**: A visually appealing interface with colors inspired by the Python language.
*   **Interactive Gameplay**:
    *   Select an answer for each question.
    *   Immediate feedback (correct/incorrect) for each selected answer.
    *   Navigate between questions using "Previous" and "Next" buttons.
*   **Scoring**: Receive a score at the end of the quiz indicating how many questions you answered correctly.
*   **Restart Option**: Easily restart the quiz to try again.
*   **Serverless Architecture**: Designed to be deployed on platforms like Vercel.

## 3. How to Play the Quiz

1.  **Starting the Quiz**:
    *   When you open the application in your web browser, the first question will be automatically loaded and displayed.

2.  **Answering a Question**:
    *   Read the question carefully.
    *   Click on one of the four option buttons below the question to select your answer.
    *   Once you select an answer:
        *   Your chosen option will be highlighted.
        *   Immediate feedback will appear: "Correct!" or "Incorrect. The correct answer is: [Correct Answer]".
    *   An explanation for the correct answer will also be displayed below the feedback.
    *   The correct answer will be highlighted in green, and if you chose incorrectly, your selection will be highlighted in red.
    *   The options for that question will be disabled.

3.  **Navigating Questions**:
    *   **Next Button**: Click the "Next" button to move to the next question. This button is enabled once you've attempted the current question, or if you're returning to an already answered question.
    *   **Previous Button**: Click the "Previous" button to go back to the previous question. This button is disabled if you are on the first question.

4.  **Submitting the Quiz**:
    *   When you reach the last question and have answered it, the "Next" button will be replaced by a "Submit Quiz" button.
    *   The "Submit Quiz" button will only be enabled once all questions have been answered.
    *   Click the "Submit Quiz" button to finish the quiz and see your results.

5.  **Viewing Results**:
    *   After submitting, the quiz area will be replaced by the results screen.
    *   This screen will display your score (e.g., "You scored X out of Y").

6.  **Restarting the Quiz**:
    *   On the results screen, click the "Restart Quiz" button to start the quiz over from the beginning with a fresh set of answers.

## 4. Technical Overview

This application is built using modern web technologies and follows a separation of concerns:

*   **Frontend**:
    *   `public/index.html`: The main HTML structure of the application.
    *   `public/style.css`: Contains all the styling rules for the visual appearance.
    *   `public/script.js`: Handles all client-side logic, including fetching questions, displaying them, user interactions, answer validation (client-side feedback), and navigation.
*   **Backend (API)**:
    *   `index.py`: A Python Flask application that serves as the backend.
        *   It provides an API endpoint (`/api/questions`) to fetch the quiz questions.
        *   It serves the static files (HTML, CSS, JS) from the `public` directory.
*   **Data**:
    *   `questions.json`: A JSON file storing all the quiz questions, their options, and the correct answers. To add more questions, you can edit this file following the existing format.
*   **Deployment Configuration**:
    *   `vercel.json`: Configuration file for deploying the application to the Vercel platform.
    *   `requirements.txt`: Lists the Python dependencies (primarily Flask).

### File Structure:

```
e:/projects/python_games/quiz/
├── public/
│   ├── index.html       # Main HTML page
│   ├── script.js        # Client-side JavaScript
│   └── style.css        # CSS styles
├── index.py             # Python Flask API
├── questions.json       # Quiz questions data
├── requirements.txt     # Python dependencies
├── USER_GUIDE.md        # This user guide
├── DEVELOPER_GUIDE.md   # Guide for developers
└── vercel.json          # Vercel deployment configuration
```

### Adding More Questions:

1.  Open the `questions.json` file.
2.  Add new question objects to the JSON array. Each question object should have the following format:
    ```json
    {
      "id": UNIQUE_NUMBER,
      "question": "Your question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "answer": "The correct option text here",
      "explanation": "A brief explanation of why this is the correct answer."
    }
    ```
3.  Ensure the `id` is unique for each question.
4.  Save the file. The application will automatically pick up the new questions the next time it's loaded (or when the `/api/questions` endpoint is called).

## 5. Running Locally (for Development/Testing)

To run the quiz application on your local machine:

1.  **Prerequisites**:
    *   Python 3.x installed.
    *   pip (Python package installer) installed.

2.  **Setup**:
    *   Open your terminal or command prompt.
    *   Navigate to the project directory: `cd e:\projects\python_games\quiz`
    *   Install the required Python packages: `pip install -r requirements.txt`

3.  **Run the Application**:
    *   Execute the Python backend script: `python index.py`
    *   You should see output indicating the Flask development server is running (e.g., `* Running on http://127.0.0.1:5000/`).

4.  **Access in Browser**:
    *   Open your web browser (e.g., Chrome, Firefox).
    *   Go to the address: `http://127.0.0.1:5000/`

## 6. Deployment

This application is structured for easy deployment to serverless platforms like Vercel. The `vercel.json` file contains the necessary configuration for Vercel to build and serve the application, using the Python runtime for the backend API and serving the static frontend files.

---

Enjoy the Python Quiz Challenge!
