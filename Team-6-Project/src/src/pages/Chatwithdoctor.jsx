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
  const doctorName = pageData?.name;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !doctorName) return;

      try {
        const messagesRef = collection(
          db,
          "Messaging",
          user.uid,
          "doctors",
          doctorName,
          "chats",
          "chat",
          "messages"
        );
        const q = query(messagesRef, orderBy("timestamp"));
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
    if (!user || !pageData?.name) return;

    const timestamp = new Date().toISOString();
    const messageData = {
      text,
      isCurrentUser,
      timestamp
    };

    try {
      const messageDocRef = doc(
        db,
        "Messaging",
        user.uid,
        "doctors",
        pageData.name,
        "chats",
        "chat",
        "messages",
        timestamp
      );
      await setDoc(messageDocRef, messageData);

      const quickInfoRef = doc(
        db,
        "Messaging",
        user.uid,
        "doctors",
        pageData.name,
        "quickInfo",
        "info"
      );
      await setDoc(quickInfoRef, {
        lastMessage: text,
        timestamp
      }, { merge: true });
    } catch (error) {
      console.error("Failed to save message:", error);
    }
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
    if (e.key === "Enter") sendMessage();
  };

  const leaveChat = () => setPage("profile");

  return (
    <div className="chatbox">
      <div id="chat-header">
        <span id="back-button" onClick={leaveChat}>←</span>
        <h2>Chat with {doctorName || "Unknown Doctor"}</h2>
      </div>
      <div id="chat-container">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.isCurrentUser ? "right" : "left"}`}>
            <span>{msg.text}</span>
          </div>
        ))}
        {isLoading && (
          <div className="message left"><span>Typing...</span></div>
        )}
      </div>
      <div
        id="input-container"
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "white",
          padding: "10px",
          borderTop: "1px solid #ccc",
          borderRadius: "10px",
          gap: "10px"
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "1em",
            textAlign: "left"  // Ensures text is left-aligned
          }}
        />
        <button
          onClick={sendMessage}
          disabled={!inputValue.trim() || isLoading}
          style={{
            padding: "10px 16px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatboxwithdoctor;