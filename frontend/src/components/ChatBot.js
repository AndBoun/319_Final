import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComments, faTimes, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import '../css/ChatBot.css';

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    const callHuggingFaceAPI = async (message) => {
        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
                {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ inputs: message }),
                }
            );
            const result = await response.json();
            return result[0]?.generated_text || "Sorry, I couldn't process that.";
        } catch (error) {
            console.error("Error:", error);
            return "Sorry, I'm having trouble connecting right now.";
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (inputMessage.trim() === '') return;

        setMessages([...messages, { type: 'user', text: inputMessage }]);
        
        // Show loading state
        setMessages(prev => [...prev, { type: 'bot', text: '...' }]);
        
        // Get AI response
        const aiResponse = await callHuggingFaceAPI(inputMessage);
        
        // Update with actual response
        setMessages(prev => [...prev.slice(0, -1), { type: 'bot', text: aiResponse }]);
        setInputMessage('');
    };

    return (
        <div className="chatbot-container">
            <div className={`chat-window ${isOpen ? 'visible' : ''}`}>
                <div className="chat-header">
                    <h3 style={{ color: 'white' }}>Chat Assistant</h3>
                    <button onClick={() => setIsOpen(false)}>
                        <FontAwesomeIcon icon={faTimes} />
                    </button>
                </div>
                <div className="chat-messages">
                    {messages.map((message, index) => (
                        <div key={index} className={`message ${message.type}`}>
                            {message.text}
                        </div>
                    ))}
                </div>
                <form onSubmit={handleSendMessage} className="chat-input">
                    <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faPaperPlane} />
                    </button>
                </form>
            </div>
            <button className="chat-button" onClick={() => setIsOpen(!isOpen)}>
                <FontAwesomeIcon icon={faComments} />
            </button>
        </div>
    );
};

export default ChatBot;
