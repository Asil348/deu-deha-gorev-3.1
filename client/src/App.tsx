import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";

import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import 'bootstrap/dist/css/bootstrap.min.css';


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
