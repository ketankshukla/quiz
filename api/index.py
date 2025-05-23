from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__, static_folder='../static', template_folder='../templates') # Adjusted for Vercel structure

# Determine the base directory of the project (quiz folder)
# For Vercel, __file__ will be something like /var/task/api/index.py
# So, quiz_dir should point to /var/task/
quiz_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
questions_file_path = os.path.join(quiz_dir, 'questions.json')

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

# Serve static files (HTML, CSS, JS) from the root of the 'quiz' directory
# Vercel handles this by default for files in the root or a 'public' directory.
# These routes are more for local development consistency or if Vercel needs an explicit handler for all files.
@app.route('/')
def serve_index():
    # Serve index.html from the root of the 'quiz' directory
    return send_from_directory(quiz_dir, 'index.html')

@app.route('/<path:filename>')
def serve_static_files(filename):
    # Serve other static files (style.css, script.js, questions.json) from the root of the 'quiz' directory
    # This ensures questions.json is also served if the JS tries to fetch it directly before API integration
    # and also handles .css and .js files.
    allowed_files = ['style.css', 'script.js', 'questions.json']
    if filename in allowed_files:
        return send_from_directory(quiz_dir, filename)
    # For any other path, especially if it's not a known static file, 
    # it might be better to return a 404 or let Vercel handle it.
    # However, to ensure index.html is served for client-side routing (if any), 
    # some apps return index.html for unknown paths.
    # For this simple quiz, specific file serving is fine.
    return send_from_directory(quiz_dir, 'index.html') # Fallback to index for SPA-like behavior if needed, or 404


# This is for local development. Vercel uses its own server.
if __name__ == '__main__':
    app.run(debug=True, port=5001) # Using a different port for local dev if needed
