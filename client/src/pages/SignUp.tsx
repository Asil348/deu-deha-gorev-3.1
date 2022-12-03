import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const SignUp = () => {
  const [registeredUsername, setRegisteredUsername] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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
          id: res.data[0].id,
          username: registeredUsername,
          email: registeredEmail,
          password: registeredPassword,
        });
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: res.data[0].id,
            username: registeredUsername,
            email: registeredEmail,
            password: registeredPassword,
          })
        );
        setErrorMessage("success");
        navigate("/profile");
      })
      .catch((err) => {
        setErrorMessage(err.response.data.message);
        setRegisteredUsername("");
        setRegisteredEmail("");
        setRegisteredPassword("");
      });
  };

  useEffect(() => {
    if (user.username) {
      navigate("/profile");
    }
  }, []);

  return (
    <div className="registration h-100 d-flex justify-content-center align-items-center">
      <Card className="p-4" style={{ width: "22em" }}>
        <Card.Body>
          <Card.Title>Kayıt Ol</Card.Title>
          <Form onSubmit={register}>
            <Form.Group className="mb-3">
              <Form.Label>Kullanıcı Adı</Form.Label>
              <Form.Control
                type="text"
                placeholder="Kullanıcı adı"
                required
                value={registeredUsername}
                onChange={(e) => {
                  setRegisteredUsername(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                required
                value={registeredEmail}
                onChange={(e) => {
                  setRegisteredEmail(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Parola</Form.Label>
              <Form.Control
                type="password"
                placeholder="Parola"
                required
                value={registeredPassword}
                onChange={(e) => {
                  setRegisteredPassword(e.target.value);
                }}
              />
            </Form.Group>
            <Button className="w-100" variant="primary" type="submit">
              Kayıt Ol
            </Button>
            <hr />
            <Link to="/">
              <Button className="w-100 mt-3" variant="secondary">
                Giriş Yap
              </Button>
            </Link>
          </Form>
          <p className="mt-3 text-center text-danger">{errorMessage}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
