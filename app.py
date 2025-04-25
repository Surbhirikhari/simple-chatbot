from flask import Flask, render_template, request, jsonify
from chatbot import get_response  # Importing the function from chatbot.py

app = Flask(__name__)

@app.route('/')
def index():
    # Renders the index.html (your frontend page)
    return render_template('index.html')

@app.route('/get_response', methods=['POST'])
def get_response_route():
    try:
        user_message = request.json['message']
        
        # Call the get_response function from chatbot.py
        bot_response = get_response(user_message)
        
        return jsonify({'response': bot_response})
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'response': "Sorry, there was an error processing your request."})

if __name__ == '__main__':
    app.run(debug=True)
