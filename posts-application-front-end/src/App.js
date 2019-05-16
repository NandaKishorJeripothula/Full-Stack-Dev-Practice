import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/Navbar.component";
import Home from "./components/Home.component";
import User from "./components/User.component";
import Post from "./components/Post.component";
function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <br />
        <Route path="/" exact component={Home} />
        <Route path="/userView" component={User} />
        <Route path="/postView" component={Post} />
      </div>
    </Router>
  );
}

export default App;
