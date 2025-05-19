import React, { useState } from "react";

// windows
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Dmlist from "./pages/Dmlist.jsx";
import Drlist from "./pages/Drlist.jsx";
import Chatbox from "./pages/Chatbox.jsx";
import Settings from "./pages/Settings.jsx";

function App() {
	const [page, setPage] = useState("home");
	const [pageData, setPageData] = useState(null); // To hold doctorName or other props

	// Custom navigation to allow passing props
	const handleSetPage = (newPage, data = null) => {
		setPage(newPage);
		setPageData(data);
	};

	return (
		<>
			{page === "home" && <HomePage setPage={handleSetPage} />}
			{page === "login" && <Login setPage={handleSetPage} />}
			{page === "profile" && <Profile setPage={handleSetPage} />}
			{page === "dmlist" && <Dmlist setPage={handleSetPage} />}
			{page === "drlist" && <Drlist setPage={handleSetPage} />}
			{page === "chatbox" && <Chatbox setPage={handleSetPage} />}
			{page === "settings" && <Settings setPage={handleSetPage} />}
			{page === "chatwithdoctor" && (
				<Chatbox setPage={handleSetPage}/>
			)}
		</>
	);
}

export default App;
