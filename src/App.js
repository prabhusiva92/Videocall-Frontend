import React, { useState } from "react";
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom'
import "./App.css"

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";

function App() {
  const [name, setName] = useState("");
  const [LoginRoomID, setLoginRoomID] = useState(145862435456)
  const [UserID, setUserID] = useState ("")

  return (
    <div>
        <Router>
					<Route exact path="/login">
						<Login setName={setName}  setUserID={setUserID} />
					</Route>
					<Route exact path="/dashboard">
						<Dashboard name={name} UserID={UserID} LoginRoomID={LoginRoomID} />
					</Route>
					<Redirect from="/" to="/dashboard" />
				</Router>
    </div>
  );
}

export default App;
