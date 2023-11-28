import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import MarketingAngleForm from "./components/Form";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MarketingAngleForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
