import { useState } from 'react';
import '../css/Chatbox.css';

function Chatbox({ setPage }) {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");

    const sendMessage = () => {
        if (inputValue.trim() !== "") {
            setMessages([...messages, { text: inputValue, isCurrentUser: true }]);
            setInputValue("");

            // Simulate a response from the other user
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "This is a response from the other user.", isCurrentUser: false },
                ]);
            }, 1000);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    const leaveChat = () => {
        alert("You have left the chat.");
        setPage("home");
    };

    return (
        <div className="chatbox">
            <div id="chat-header">
                <span id="back-button" onClick={leaveChat}>←</span>
                <h2>Chat Room</h2>
            </div>

            <div id="chat-container">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`message ${message.isCurrentUser ? "right" : "left"}`}
                    >
                        <span>{message.text}</span>
                    </div>
                ))}
            </div>

            <div id="input-container">
                <input
                    type="text"
                    id="message-input"
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <button id="send-button" onClick={sendMessage} disabled={!inputValue.trim()}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default Chatbox;
