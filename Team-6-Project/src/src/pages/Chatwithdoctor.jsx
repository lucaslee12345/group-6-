import { useState } from "react";
import "../css/Chatwithdoctor.css";

function Chatbox({ setPage, doctorName }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    // Add the user's message to the chat
    const userMessage = { text: inputValue, isCurrentUser: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Simulate sending the message to the doctor and receiving a response
      const response = await fetch(
        `https://npiregistry.cms.hhs.gov/api/?version=2.1&state=CA&limit=1`
      );
      const data = await response.json();

      // Simulate a response from the doctor
      const doctorResponse = {
        text: `Hello, this is ${doctorName}. How can I assist you?`,
        isCurrentUser: false,
      };

      setTimeout(() => {
        setMessages((prevMessages) => [...prevMessages, doctorResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error communicating with the doctor:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: "Failed to send message. Please try again.", isCurrentUser: false },
      ]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const leaveChat = () => {
    alert("You have left the chat.");
    setPage("profile");
  };

  return (
    <div className="chatbox">
      {/* Chat Header */}
      <div id="chat-header" style={{ animation: "fadeIn 1s" }}>
        <span id="back-button" onClick={leaveChat} style={{ cursor: "pointer" }}>
          ←
        </span>
        <h2 style={{ animation: "slideIn 1s" }}>Chat with {doctorName}</h2>
      </div>

      {/* Chat Container */}
      <div id="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isCurrentUser ? "right" : "left"}`}
            style={{
              animation: message.isCurrentUser ? "slideInRight 0.5s" : "slideInLeft 0.5s",
            }}
          >
            <span>{message.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className="message left" style={{ animation: "fadeIn 0.5s" }}>
            <span>Typing...</span>
          </div>
        )}
      </div>

      {/* Input Container */}
      <div id="input-container" style={{ animation: "fadeInUp 1s" }}>
        <input
          type="text"
          id="message-input"
          placeholder="Type your message..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          style={{
            transition: "box-shadow 0.3s",
            boxShadow: inputValue ? "0 0 10px rgba(33, 150, 243, 0.5)" : "none",
          }}
        />
        <button
          id="send-button"
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          style={{
            backgroundColor: isLoading ? "#ccc" : "#2196F3",
            color: isLoading ? "#666" : "#fff",
            transition: "background-color 0.3s, transform 0.2s",
            transform: isLoading ? "scale(0.95)" : "scale(1)",
          }}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
