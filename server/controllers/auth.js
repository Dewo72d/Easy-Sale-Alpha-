const mysql = require("mysql");
const db = require("../models/db");
const ejwt = require("express-jwt");
const bCrypt = require("bcrypt");
const { jwtSecret } = require("../config/authConfig");
const jwt = require("jsonwebtoken");

exports.logIn = (req, res) => {
  const { email, password } = req.body;
  const sqlreq = `SELECT * FROM users WHERE email = ('${email}')`;
  db.connection.query(sqlreq, (err, result) => {
    if (result.length == 0) {
      res.status(401).json({
        message: "пользователь не найден",
      });
    } else {
      const isValid = bCrypt.compareSync(password, result[0].password);
      if (isValid) {
        const token = jwt.sign(
          {
            id: result[0].id,
          },
          jwtSecret,
          {
            expiresIn: 60 * 60,
          },
          (err, token) => {
            if (err) {
              console.log(err);
            } else {
              res.cookie("auth", `${token}`);
              console.log(token);
              res.redirect("http://localhost:3000/");
            }
          }
        );
      } else {
        res.status(401).json({
          massage: "Неверный пароль!",
        });
      }
    }
  });
};

// на страницу подгружать по  id
