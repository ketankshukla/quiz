from flask import Flask, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

# Path to questions.json in the same directory as this file
questions_file_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'questions.json')

@app.route('/api/questions', methods=['GET'])
def get_questions():
    try:
        with open(questions_file_path, 'r', encoding='utf-8') as f:
            questions_data = json.load(f)
        return jsonify(questions_data)
    except FileNotFoundError:
        return jsonify({"error": "Questions file not found. Path: " + questions_file_path}), 404
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
