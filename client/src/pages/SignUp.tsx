import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

const SignUp = () => {
  const [registeredUsername, setRegisteredUsername] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");

  const { user, setUser }: any = useContext(UserContext);

  const navigate = useNavigate();

  const register = (e: any) => {

    e.preventDefault();

    axios
      .post("http://localhost:1337/register", {
        username: registeredUsername,
        email: registeredEmail,
        password: registeredPassword,
      })
      .then((res) => {
        setUser({
          username: registeredUsername,
          email: registeredEmail,
          password: registeredPassword,
        });
        navigate("/profile");
      });
  };

  useEffect(() => {
    if (user.username) {
      console.log("already logged in, redirecting to profile...");
      navigate("/profile");
    }
  }, []);

  return (
    <div className="registration">
      <h1>Registration</h1>
      <form onSubmit={register}>
        <label>Username</label>
        <input
          type="text"
          onChange={(e) => {
            setRegisteredUsername(e.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => {
            setRegisteredEmail(e.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => {
            setRegisteredPassword(e.target.value);
          }}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default SignUp;
