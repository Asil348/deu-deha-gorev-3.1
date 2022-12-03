import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Profile = () => {
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // basic logout function, set the user state to empty, and empty the user object from local storage, then redirect to the index route
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
      // if the old password and new password are the same
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("Yeni parola eskisiyle aynı olamaz.");
    } else if (oldPassword !== user.password) {
      // if the old password is not the same as the user's password
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("Eski parola yanlış.");
    } else {
      // change password from both the user state and local storage
      axios
        .post("http://localhost:1337/change-password", {
          id: user.id,
          password: newPassword,
        })
        .then((res) => {
          console.log(res);
        });
      setUser({ ...user, password: newPassword });
      // setUser is ran AFTER the below line, so localStorage.setItem("user", JSON.stringify(user)) will not work.
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, password: newPassword })
      );
      setOldPassword("");
      setNewPassword("");
      setErrorMessage("Başarılı");
    }
  };

  useEffect(() => {
    if (!user.username) {
      // if the user state doesn't have a username, which means the user is not logged in
      console.log("not logged in, redirecting to login...");
      navigate("/");
    }
  }, []);

  return (
    <div className="profile h-100 d-flex justify-content-center align-items-center">
      {user.username ? (
        <>
          <Card style={{ width: "50em" }}>
            <Card.Body>
              <Card.Title>Profil</Card.Title>
              <Form onSubmit={changePassword}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Kullanıcı adı
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={user.username}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      plaintext
                      readOnly
                      defaultValue={user.email}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Parola
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      value={oldPassword}
                      placeholder="Eski parola"
                      className="mb-3"
                      required
                    />
                    <Form.Control
                      type="password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      placeholder="Yeni parola"
                      required
                    />
                  </Col>
                </Form.Group>
                <p className="text-center text-danger">{errorMessage}</p>
                <Button className="w-100" variant="primary" type="submit">
                  Parola Değiştir
                </Button>
              </Form>
              <hr />
              <Button className="w-100" variant="danger" onClick={logout}>
                Çıkış yap
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        <h1>Giriş yapılmadı.</h1>
      )}
    </div>
  );
};

export default Profile;
