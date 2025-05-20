import { useState, useEffect } from "react";
import {
  getFirestore,
  doc,
  setDoc,
  getDocs,
  collection,
  query,
  orderBy,
  onSnapshot,
  getDoc
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
  const [doctorData, setDoctorData] = useState(null);

  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!user || !pageData?.name) return;

      try {
        const chatRef = doc(db, 'Messaging', user.uid, 'doctors', pageData.name, 'chats', 'chat');
        const chatSnap = await getDoc(chatRef);
        if (chatSnap.exists()) {
          setDoctorData(chatSnap.data());
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      }
    };

    fetchDoctorData();
  }, [user, pageData?.name]);

  useEffect(() => {
    if (!user || !pageData?.name) return;

    const messagesRef = collection(
      db,
      "Messaging",
      user.uid,
      "doctors",
      pageData.name,
      "chats",
      "chat",
      "messages"
    );

    const q = query(messagesRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const loadedMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [db, user, pageData?.name]);

  const saveMessage = async (text, isCurrentUser) => {
    if (!user || !pageData?.name) return;

    const timestamp = new Date().toISOString();
    const messageData = {
      text,
      isCurrentUser,
      timestamp
    };

    try {
      // Save message
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

      // Update quickInfo
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
    setInputValue("");
    setIsLoading(true);
    await saveMessage(userMessage.text, true);

    // Simulate doctor response
    setTimeout(async () => {
      const reply = {
        text: "Thank you for your message. I will get back to you as soon as possible.",
        isCurrentUser: false,
        timestamp: new Date().toISOString()
      };
      await saveMessage(reply.text, false);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const leaveChat = () => setPage("dmlist");

  if (!pageData?.name) {
    return (
      <div className="chatbox">
        <div id="chat-header">
          <span id="back-button" onClick={leaveChat}>←</span>
          <h2>Error: No doctor selected</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="chatbox">
      <div id="chat-header">
        <span id="back-button" onClick={leaveChat}>←</span>
        <div>
          <h2>Dr. {pageData.name}</h2>
          {doctorData?.specialty && <p style={{ margin: 0, fontSize: '0.9em', color: '#666' }}>{doctorData.specialty}</p>}
        </div>
      </div>
      <div id="chat-container">
        {messages.map((msg, i) => (
          <div key={i} className={`message ${msg.isCurrentUser ? "right" : "left"}`}>
            <span>{msg.text}</span>
            <div style={{ fontSize: "0.7em", color: "#888" }}>
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message left"><span>Typing...</span></div>
        )}
      </div>
      <div id="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} disabled={!inputValue.trim() || isLoading}>
          {isLoading ? "Loading..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default Chatboxwithdoctor;