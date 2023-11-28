import "./App.css";
import React from "react";
import {Router,Routes, Route } from "react-router-dom";
import Form from "./components/Form";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Form />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
