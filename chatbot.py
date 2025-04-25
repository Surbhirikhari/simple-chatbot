import random
from datetime import datetime

def get_response(user_input):
    user_input = user_input.lower()

    # Greetings
    greetings = ["hi", "hello", "hey", "howdy", "greetings"]
    if any(greeting in user_input for greeting in greetings):
        return random.choice(["Hello! How can I assist you today?", "Hi there! What can I do for you?"])

    # Time
    if 'time' in user_input:
        current_time = datetime.now().strftime("%H:%M")
        return f"The current time is {current_time}."

    # Farewell
    elif user_input in ["bye", "goodbye", "see you"]:
        return "Goodbye! Have a nice day!"

    # Asking name
    elif "your name" in user_input:
        return "I'm a simple chatbot. You can call me ChatBot!"

    # Asking identity
    elif "who are you" in user_input or "what are you" in user_input:
        return "I'm a chatbot made in Python to chat with you!"

    # Feeling
    elif "how are you" in user_input:
        return "I'm just a bot, but I'm doing great! How about you?"

    # Joke
    elif "joke" in user_input or "funny" in user_input or "laugh" in user_input:
        jokes = [
            "Why did the Python programmer wear glasses? Because they couldn't C#.",
            "How many programmers does it take to change a light bulb? None, that's a hardware problem!",
            "Why do programmers always mix up Halloween and Christmas? Because Oct 31 == Dec 25.",
            "Why don't scientists trust atoms? Because they make up everything!",
            "Why did the scarecrow win an award? Because he was outstanding in his field!",
            "What do you call a fake noodle? An impasta!",
            "What's the best thing about Switzerland? I don't know, but the flag is a big plus.",
            "Did you hear about the mathematician who's afraid of negative numbers? He'll stop at nothing to avoid them."
        ]
        return random.choice(jokes)
    

    # Default response
    else:
        return "I'm sorry, I don't understand that. Can you please rephrase?"
