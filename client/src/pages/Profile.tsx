import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, setUser }: any = useContext(UserContext);

  const navigate = useNavigate();

  const logout = () => {
    setUser({ username: "", password: "" });
  };

  useEffect(() => {
    if (!user.username) {
      console.log("not logged in, redirecting to login...");
      navigate("/");
    }
  }, [])

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
