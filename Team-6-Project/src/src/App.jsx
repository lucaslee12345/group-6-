import React, { useState } from "react";

// windows
import HomePage from "./pages/HomePage.jsx";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile.jsx";
import Dmlist from "./pages/Dmlist.jsx";
import Drlist from "./pages/Drlist.jsx";
import Chatbox from "./pages/Chatbox.jsx";
import Settings from "./pages/Settings.jsx";
import ChatboxwithDoctor from "./pages/Chatwithdoctor.jsx";

function App() {
  const [page, setPage] = useState("home");
  const [pageData, setPageData] = useState(null); // Holds doctor info

  // Custom navigation to allow passing props
  const handleSetPage = (newPage, data = null) => {
    setPage(newPage);
    setPageData(data);
  };

  // TODO: pull the Dr list from Drlist.jsx

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
		<ChatboxwithDoctor setPage={handleSetPage} pageData={pageData} />
	  )}

    </>
  );
}

export default App;
