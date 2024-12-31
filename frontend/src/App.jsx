import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "./Components/privateRoute";

import MainPage from "./Components/mainPage";
import Login from "./Components/login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {/* Protected Route */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />
        {/* <Route path="/" element={<MainPage />} /> */}
      </Routes>
    </Router>
  );  
}

export default App;