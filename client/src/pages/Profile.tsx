import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const logout = () => {
    setUser({ id: "", username: "", email: "", password: "" });
    localStorage.setItem(
      "user",
      JSON.stringify({ id: "", username: "", email: "", password: "" })
    );
    navigate("/");
  };

  const changePassword = (e: any) => {
    e.preventDefault();

    if (oldPassword === newPassword) {
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("new password must be different from old password");
    } else if (oldPassword !== user.password) {
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("Incorrect old password");
    } else {
      axios
        .post("http://localhost:1337/change-password", {
          id: user.id,
          password: newPassword,
        })
        .then((res) => {
          console.log(res);
        });
      setUser({ ...user, password: newPassword });
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, password: newPassword })
      );
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("success");
    }
  };

  useEffect(() => {
    if (!user.username) {
      console.log("not logged in, redirecting to login...");
      navigate("/");
    }
  }, []);

  return (
    <>
      <Link to="/">sign in</Link>
      <Link to="/signup">Sign Up</Link>
      <div>
        Profile
        {user.username ? (
          <>
            <h1>Username: {user.username}</h1>
            <h1>Email: {user.email}</h1>
            <form onSubmit={changePassword}>
              <label>Change Password </label>
              <input
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                placeholder="Old password"
              />
              <input
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                placeholder="New password"
              />
              <input type="submit" value="Değiştir" />
              <p>{errorMessage}</p>
            </form>
            <input type="button" value="Logout" onClick={logout} />
          </>
        ) : (
          <h1>Not logged in.</h1>
        )}
      </div>
    </>
  );
};

export default Profile;
