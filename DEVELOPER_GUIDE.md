# Python Quiz App - Developer Guide

## Deploying a Flask Application to Vercel

This guide explains how to structure and deploy a Flask application to Vercel, using this Python Quiz application as a reference example.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Key Files and Their Purpose](#key-files-and-their-purpose)
3. [Setting Up for Vercel Deployment](#setting-up-for-vercel-deployment)
4. [Local Development](#local-development)
5. [Deployment Process](#deployment-process)
6. [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Project Structure

For a Flask application to deploy correctly on Vercel, use this structure:

```
your-project/
├── public/                  # Static files directory
│   ├── index.html           # Main HTML page
│   ├── script.js            # Client-side JavaScript
│   └── style.css            # CSS styles
├── index.py                 # Main Flask application (MUST be at root level)
├── questions.json           # Data file (or any other data source)
├── requirements.txt         # Python dependencies
└── vercel.json              # Vercel configuration file
```

**Important Notes:**
- The main Flask application file (`index.py`) must be at the root level of your project
- Static files should be placed in a `public` directory
- The `vercel.json` configuration must point to the root-level Flask file

## Key Files and Their Purpose

### 1. `index.py` (Main Flask Application)

This file contains your Flask application and should be placed at the root level of your project. It should:
- Initialize the Flask app
- Define API endpoints
- Handle serving static files from the `public` directory

Example:

```python
from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

# Path to data file
data_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'questions.json')

# API endpoint
@app.route('/api/questions', methods=['GET'])
def get_questions():
    try:
        with open(data_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return jsonify(data)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve static files from the 'public' directory
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join('public', path)):
        return send_from_directory('public', path)
    else:
        return send_from_directory('public', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)
```

### 2. `vercel.json` (Vercel Configuration)

This file tells Vercel how to build and route requests for your application. For a Flask app, use this configuration:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./index.py",
      "use": "@vercel/python",
      "config": { "maxLambdaSize": "15mb", "runtime": "python3.9" }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.py"
    }
  ]
}
```

This configuration:
- Specifies that `index.py` should be built using the Python runtime
- Routes all requests to your Flask application, which then handles both API requests and serving static files

### 3. `requirements.txt` (Python Dependencies)

List all Python packages your application depends on:

```
flask==3.0.3
```

Vercel uses this file to install dependencies during the build process.

### 4. Static Files in `public/` Directory

All static assets (HTML, CSS, JavaScript, images, etc.) should be placed in the `public` directory. Your Flask application will serve these files using the route handler shown in the `index.py` example.

## Setting Up for Vercel Deployment

Follow these steps to prepare your Flask application for Vercel deployment:

1. **Create the project structure** as outlined above
2. **Place your Flask application code** in `index.py` at the root level
3. **Create a `vercel.json`** file with the configuration shown above
4. **Create a `requirements.txt`** file listing your Python dependencies
5. **Place all static files** in the `public` directory
6. **Initialize a Git repository** (if not already done):
   ```
   git init
   git add .
   git commit -m "Initial commit"
   ```

## Local Development

To develop and test your application locally:

1. **Install dependencies**:
   ```
   pip install -r requirements.txt
   ```

2. **Run the Flask application**:
   ```
   python index.py
   ```

3. **Access your application** at `http://127.0.0.1:5000/`

## Deployment Process

To deploy your Flask application to Vercel:

1. **Create a Vercel account** at [vercel.com](https://vercel.com) if you don't have one

2. **Install the Vercel CLI** (optional, for command-line deployment):
   ```
   npm install -g vercel
   ```

3. **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket):
   ```
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin master
   ```

4. **Deploy using one of these methods**:

   a. **Via Vercel Dashboard**:
      - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
      - Click "New Project"
      - Import your Git repository
      - Vercel will detect it's a Python project
      - Ensure the "Root Directory" field is blank (or points to your project root)
      - Click "Deploy"

   b. **Via Vercel CLI**:
      - Navigate to your project directory
      - Run `vercel` and follow the prompts
      - For production deployment, use `vercel --prod`

5. **Verify your deployment** by visiting the URL provided by Vercel

## Troubleshooting Common Issues

### 404 Errors

If you're getting 404 errors when accessing your deployed site:

1. **Check your `vercel.json` configuration**:
   - Ensure the `src` in the `builds` section points to `./index.py`
   - Ensure the route pattern `"src": "/(.*)"` is correctly routing to `"/index.py"`

2. **Verify your Flask route handlers**:
   - Make sure your Flask app has route handlers for both API endpoints and static files
   - Check that the path to the `public` directory is correct in your static file handler

3. **Check Vercel Project Settings**:
   - In your Vercel project dashboard, ensure the "Root Directory" setting is blank or correctly points to your project root
   - If you've set a framework preset, try changing it to "Other" or removing it

### API Endpoint Issues

If your API endpoints aren't working:

1. **Check the path construction** in your Flask app for any data files
2. **Verify CORS settings** if your frontend is hosted separately
3. **Review Vercel Function Logs** in your project dashboard for any runtime errors

### Static File Serving Issues

If static files aren't being served correctly:

1. **Ensure all static files** are in the `public` directory
2. **Check your Flask route handler** for serving static files
3. **Verify file paths** in your HTML/CSS/JS files (they should be relative to the root, e.g., `/style.css` not `/public/style.css`)

---

By following this guide, you should be able to successfully deploy a Flask application to Vercel. The key is to maintain the correct project structure with the Flask app at the root level and static files in the `public` directory.
