import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc
} from "firebase/firestore";
import {
  getAuth,
  onAuthStateChanged
} from "firebase/auth";
import "../css/Chatwithdoctor.css";

function Chatboxwithdoctor({ setPage, pageData }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Use the doctor name from props
  const doctorName = pageData?.name || "Unknown Doctor";
  const currentDate = Date.now();
  const saveMessagesToFirestore = async (allMessages) => {
    if (!user) return;
  
    const messagingPath = `Messaging/${user.uid}/${doctorName}`;
  
    // Save message array to the Messages document
    const messagesRef = doc(db, messagingPath, "Messages");
    await setDoc(messagesRef, {
      messages: allMessages,
      lastUpdated: new Date()
    });
  
    // Update quickInfo with the latest message
    const lastMessageText = allMessages[allMessages.length - 1]?.text || "";
    const quickInfoRef = doc(db, messagingPath, "quickInfo");
    await setDoc(quickInfoRef, {
      lastMessage: lastMessageText,
      timestamp: new Date()
    }, { merge: true });
  };
  

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = { text: inputValue, isCurrentUser: true };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    // Save after user message
    await saveMessagesToFirestore(updatedMessages);

    // Simulate responder reply
    setTimeout(async () => {
      const reply = {
        text: "This is a response from the other user.",
        isCurrentUser: false
      };
      const allMessages = [...updatedMessages, reply];
      setMessages(allMessages);
      setIsLoading(false);

      // Save after reply
      await saveMessagesToFirestore(allMessages);
    }, 1000);
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
      <div id="chat-header" style={{ animation: "fadeIn 1s" }}>
        <span
          id="back-button"
          onClick={leaveChat}
          style={{ cursor: "pointer" }}
        >
          ←
        </span>
        <h2 style={{ animation: "slideIn 1s" }}>Chat with Doctor</h2>
      </div>

      <div id="chat-container">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.isCurrentUser ? "right" : "left"}`}
            style={{
              animation: message.isCurrentUser
                ? "slideInRight 0.5s"
                : "slideInLeft 0.5s"
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
            boxShadow: inputValue
              ? "0 0 10px rgba(33, 150, 243, 0.5)"
              : "none"
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
            transform: isLoading ? "scale(0.95)" : "scale(1)"
          }}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatboxwithdoctor;