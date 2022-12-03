import express from "express";
import mysql from "mysql";
import cors from "cors";
import * as dotenv from 'dotenv';

const workDir = process.cwd();
dotenv.config({ path: `${workDir}/.env` });

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_NAME = process.env.DB_NAME;

const app = express();

app.use(express.json());
app.use(cors()); // to avoid cors errors

// create connection to database
const db = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
});

// This is for setting the user id on frontend, see client/src/pages/SignUp.tsx
app.get("/get-length", (req, res) => {
  db.query(`SELECT COUNT(*) as count FROM users`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/change-password", (req, res) => {
  const { id, password } = req.body;
  db.query(
    `UPDATE users SET password = ? WHERE id = ?`,
    [password, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/register", (req, res) => {
  let id;
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  // this is very nested, which is not good practice. will fix later.
  db.query(`SELECT COUNT(*) as count FROM users`, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      id = result[0].count;
      db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        (err, result) => {
          if (result.length > 0) {
            res.status(409).send({ message: "Bu kullanıcı adı ile kayıt olunmuş." });
          } else {
            db.query(
              "SELECT * FROM users WHERE email = ?",
              [email],
              (err, result) => {
                if (result.length > 0) {
                  res.status(409).send({ message: "Bu email ile kayıt olunmuş." });
                } else {
                  db.query(
                    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
                    [id, username, email, password],
                    (err, result) => {
                      if (err) {
                        console.log(err);
                      } else {
                        res.send("Values Inserted");
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM users WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      // if query returns nothing, then user does not exist
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Kullanıcı adı veya parola yanlış." });
      }
    }
  );
});

app.listen(1337, () => {
  console.log("Server is running on port 1337");
});
