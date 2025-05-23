from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

# In Vercel, the current working directory is typically the project root.
# The 'api' directory is where this script (index.py) lives.
# So, questions.json should be one level up from the 'api' directory.
# Path relative to this file (api/index.py) to the project root, then to questions.json
base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
questions_file_path = os.path.join(base_dir, 'questions.json')

# Alternative: Vercel often sets the current working directory to the project root
# questions_file_path = 'questions.json' # If CWD is project root
# For robustness, let's try constructing path from __file__ first.

@app.route('/api/questions', methods=['GET'])
def get_questions():
    try:
        # Correctly locate questions.json relative to the quiz_dir
        with open(questions_file_path, 'r', encoding='utf-8') as f:
            questions_data = json.load(f)
        return jsonify(questions_data)
    except FileNotFoundError:
        return jsonify({"error": "Questions file not found. Path: " + questions_file_path}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# The following routes for serving static files are removed as Vercel will handle them.

# The if __name__ == '__main__': block is primarily for local development.
# Vercel uses a WSGI server (like Gunicorn) to run the Flask app and doesn't use this block.
# It's fine to keep it for local testing, but it's not used by Vercel for serving.
if __name__ == '__main__':
    # For local testing, to ensure static files are served, we might need a simple local setup
    # or rely on Vercel CLI `vercel dev` which simulates the Vercel environment.
    # For now, let's keep it simple for the API part.
    app.run(debug=True, port=5001)
