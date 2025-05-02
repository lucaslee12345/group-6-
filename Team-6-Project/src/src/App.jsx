import React, { useState } from "react";

// windows
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Dmlist from "./pages/Dmlist.jsx";
import Drlist from "./pages/Drlist.jsx";

function App() {
	const [page, setPage] = useState("home");

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
		</>
	)
}

export default App;
