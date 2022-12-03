import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./contexts/UserContext";

const App = () => {
  const [user, setUser] = useState<any>({
    id: "",
    username: "",
    email: "",
    password: "",
  }); // set the user object as empty on first render

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}> {/* pass the user state as context */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
};

export default App;
