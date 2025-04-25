import React, { useState } from "react";

// windows
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";

function App() {
	const [page, setPage] = useState("home");

	// firebase variables bet set here


	return (
		<>
			{/* handle page navigation logic here */}
			{page==="home" && <HomePage setPage={setPage} />}
			{page==="login" && <Login setPage={setPage} />}
			{page==="profile" && <Profile setPage={setPage}/>}
		</>
	)
}

export default App
