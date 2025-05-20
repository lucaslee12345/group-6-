import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  orderBy
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
  const doctorName = pageData?.name || "Unknown Doctor";

  // Get current user on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Load previous messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !doctorName) return;
      try {
        const messagesRef = collection(
          db,
          `Messaging/${user.uid}/doctors/${doctorName}/chats/chat/messages`
        );
        const q = query(messagesRef, orderBy("__name__"));
        const querySnapshot = await getDocs(q);

        const loadedMessages = querySnapshot.docs.map(doc => doc.data());
        setMessages(loadedMessages);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    };

    fetchMessages();
  }, [db, user, doctorName]);

  const saveMessage = async (text, isCurrentUser) => {
    if (!user || !doctorName) return;
  
    const timestamp = Date.now().toString();
    const messageData = {
      text,
      isCurrentUser,
      timestamp: new Date().toISOString()
    };
  
    const messageDocRef = doc(
      db,
      "Messaging",
      user.uid,
      "doctors",
      doctorName,
      "chats",
      "chat",
      "messages",
      timestamp
    );
  
    await setDoc(messageDocRef, messageData);
  
    // ✅ Correct quickInfo document reference
    const quickInfoRef = doc(
      db,
      "Messaging",
      user.uid,
      "doctors",
      doctorName,
      "quickInfo",
      "info"
    );
  
    await setDoc(
      quickInfoRef,
      {
        lastMessage: text,
        timestamp: new Date()
      },
      { merge: true }
    );
  };  

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      text: inputValue.trim(),
      isCurrentUser: true,
      timestamp: new Date().toISOString()
    };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputValue("");
    setIsLoading(true);

    await saveMessage(userMessage.text, true);

    setTimeout(async () => {
      const reply = {
        text: "This is a response from the other user.",
        isCurrentUser: false,
        timestamp: new Date().toISOString()
      };
      const allMessages = [...updatedMessages, reply];
      setMessages(allMessages);
      setIsLoading(false);

      await saveMessage(reply.text, false);
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
        <h2 style={{ animation: "slideIn 1s" }}>Chat with {doctorName}</h2>
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
