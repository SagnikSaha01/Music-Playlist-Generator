import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import PrivateRoute from "./Components/privateRoute";

import MainPage from "./Components/mainPage";
import Login from "./Components/login";
import Register from "./Components/register";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Protected Route */}
        {/*<Route
          path="/"
          element={
            <PrivateRoute>
              <MainPage />
            </PrivateRoute>
          }
        />*/}
        {<Route path="/" element={<MainPage />} /> }
      </Routes>
    </Router>
  );  
}

export default App;