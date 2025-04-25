document.addEventListener('DOMContentLoaded', function () {
    const chatForm = document.getElementById('chat-form');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    // Focus input when page loads
    userInput.focus();

    // Function to add a message to the chat
    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message-container ${isUser ? 'user-message' : 'bot-message'}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';

        const messagePara = document.createElement('p');
        messagePara.textContent = message;

        messageContent.appendChild(messagePara);
        messageDiv.appendChild(messageContent);
        chatContainer.appendChild(messageDiv);

        // Scroll to bottom of chat container
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';

        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingDiv.appendChild(dot);
        }

        chatContainer.appendChild(typingDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    // Submit form handler
    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const message = userInput.value.trim();
        if (!message) return;

        // Display user message
        addMessage(message, true);

        // Clear input
        userInput.value = '';

        // Show typing indicator
        showTypingIndicator();

        // Send request to server (corrected endpoint)
        fetch('/get_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: message })
        })
            .then(response => response.json())
            .then(data => {
                removeTypingIndicator();

                setTimeout(() => {
                    addMessage(data.response);
                }, 500);
            })
            .catch(error => {
                console.error('Error:', error);
                removeTypingIndicator();
                addMessage('Sorry, there was an error processing your request.', false);
            });
    });

    // Handle enter key press
    userInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });
});
