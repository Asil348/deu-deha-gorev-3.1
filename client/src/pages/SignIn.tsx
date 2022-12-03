import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// !! This is the index route !! //

const SignIn = () => {
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  useEffect(() => {
    // if the username exists in local storage, which means the user has logged in before and didn't log out
    if (JSON.parse(localStorage.getItem("user") || "{}").username) {
      setUser(JSON.parse(localStorage.getItem("user") || "{}"));
      console.log("found user in local storage, setting user...");
    }

    // if the user object has a username, either in local storage or in the state, redirect to profile
    if (
      user.username ||
      JSON.parse(localStorage.getItem("user") || "{}").username
    ) {
      navigate("/profile");
    }
  }, []);

  const login = (e: any) => {
    e.preventDefault();

    // send a post request to the server to check if the username and password are correct
    axios
      .post("http://localhost:1337/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        if (res.data.message) { // if the server returns a message, which means there is a problem
          setLoginStatus(res.data.message);
        } else {
          setUser({
            id: res.data[0].id,
            username: res.data[0].username,
            email: res.data[0].email,
            password: res.data[0].password,
          });
          // setUser is ran AFTER the below line, so localStorage.setItem("user", JSON.stringify(user)) will not work.
          // JSON.stringify(user) will return an empty object, because user is not set yet.
          localStorage.setItem(
            "user",
            JSON.stringify({
              id: res.data[0].id,
              username: res.data[0].username,
              email: res.data[0].email,
              password: res.data[0].password,
            })
          );
          setLoginStatus("success");
          navigate("/profile");
        }
      });
  };

  return (
    <>
      <Link to="/profile">Profile</Link>
      <Link to="/signup">Sign Up</Link>
      <div className="login">
        <form onSubmit={login}>
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
          <button type="submit">Login</button>
        </form>
      </div>
      <h1>{loginStatus}</h1>
      <h1>{user.username}</h1>
    </>
  );
};

export default SignIn;
