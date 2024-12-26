import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import MainPage from "./Components/mainPage";
import Login from "./Components/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );  
}

export default App;