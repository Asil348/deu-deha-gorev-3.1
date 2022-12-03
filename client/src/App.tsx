import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [registeredUsername, setRegisteredUsername] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const register = () => {
    axios
      .post("http://localhost:1337/register", {
        username: registeredUsername,
        password: registeredPassword,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const login = () => {
    axios
      .post("http://localhost:1337/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.message) {
          setLoginStatus(res.data.message);
        } else {
          setLoginStatus(res.data[0].username);
        }
      });
  };

  return (
    <div className="App">
      <div className="registration">
        <h1>Registration</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setRegisteredUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setRegisteredPassword(e.target.value);
          }}
        />
        <button onClick={register}>Register</button>
      </div>
      <div className="login">
        <h1>Login</h1>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button onClick={login}>Login</button>
      </div>
      <h1>{loginStatus}</h1>
    </div>
  );
};

export default App;
