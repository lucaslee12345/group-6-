import React, { useState } from "react";

// windows
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Dmlist from "./pages/Dmlist.jsx";
import Drlist from "./pages/Drlist.jsx";
import Chatbox from "./pages/Chatbox.jsx";
import Settings from "./pages/Settings.jsx";
import Chatwithdoctor from "./pages/Chatwithdoctor.jsx"
function App() {
	const [page, setPage] = useState("home");
	const [displayName, setDisplayName] = useState("");

	// firebase variables bet set here

	// previous page, so when you press the back arrow, it goes back the previous page

	return (
		<>
			{/* handle page navigation logic here */}
			{page==="home" && <HomePage setPage={setPage} />}
			{page==="login" && <Login setPage={setPage} />}
			{page==="profile" && <Profile setPage={setPage}/>}
			{page==="dmlist" && <Dmlist setPage={setPage}/>}
			{page==="drlist" && <Drlist setPage={setPage}/>}
			{page==="chatbox" && <Chatbox setPage={setPage}/>}
			{page==="settings" && <Settings setPage={setPage}/>}
			{page==="chatwithdoctor" && <Chatwithdoctor setPage={setPage}/>}
		</>
	)
}

export default App;
