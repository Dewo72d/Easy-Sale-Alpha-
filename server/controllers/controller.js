const db = require("../models/db");
const bCrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");

//Create new user
exports.registration = (req, res, next) => {
  const fname = req.body.firstName;
  const lname = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const sqlreqChekEmail = `SELECT * FROM users WHERE email = '${email}'`;
  const salt = bCrypt.genSaltSync(10);
  const hash = bCrypt.hashSync(password, salt);

  db.connection.query(sqlreqChekEmail, (err, result) => {
    if (result.length == 0) {
      //Matching check
      const sqlreq = `INSERT INTO users(first_name, last_name, email, password) VALUES ('${fname}', '${lname}', '${email}', '${hash}')`;
      db.connection.query(sqlreq, (err, result) => {
        if (err) console.log("Ошибочка " + err);
        console.log(result);
        res.redirect("http://localhost:3000/LockPage");
      });
    } else {
      res.status(401).json({
        massage: "Таколь пользователь уже есть!",
      });
    }
  });
};

// Show Data Base
exports.product_list = (req, res, next) => {
  const cook = Object.values(req.cookies).toString();
  jwt.verify(cook, jwtSecret, (err, data) => {
    if (err) {
      res.status(401);
      res.send(null);
      console.log(err);
    } else {
      const sqlreq = `SELECT * FROM products`;
      db.connection.query(sqlreq, (err, result) => {
        if (err) console.log("ОшибОчка " + err);
        else {
          res.send(result);
        }
      });
    }
  });
};

// Add products
exports.add_product_card = (req, res, next) => {
  const cook = Object.values(req.cookies).toString();
  jwt.verify(cook, jwtSecret, (err, data) => {
    console.log(data.id);
    if (err) {
      res.status(401);
      res.redirect("http://localhost:3000/login");
      console.log(err);
    } else {
      const heder = req.body.inpFilledHeader;
      const condition = req.body.inpFilledCondition;
      const price = req.body.inpFilledPrice;
      const description = req.body.inpFilledDescription;
      const telephone = req.body.inpFilledTel;
      const userId = data.id;
      const category = req.body.selectFillCategory;

      const sqlreq = `INSERT INTO products (header, price, description, prod_condition, user_tel, user_id, category_id) VALUES ('${heder}', '${price}', '${description}', '${condition}', '${telephone}', '${userId}', '${category}')`;
      db.connection.query(sqlreq, (err, result) => {
        if (err) console.log("Ошибочка " + err);
        res.status(200);
        console.log("Done!");
      });
    }
  });
};

exports.show_product_card = (req, res, next) => {
  const cook = Object.values(req.cookies).toString();
  jwt.verify(cook, jwtSecret, (err, data) => {
    if (err) {
      res.status(401);
      res.send(null);
      console.log(err);
    } else {
      const sqlreq = `SELECT * FROM products WHERE user_id = ${data.id}`;
      db.connection.query(sqlreq, (err, result) => {
        if (err) console.log("ОшибОчка " + err);
        else {
          res.send(result);
        }
      });
    }
  });
};

// Logout
exports.logout = (req, res) => {
  const token = jwt.sign({}, jwtSecret, {
    expiresIn: 0,
  });
  res.cookie("auth", `${token}`);
  res.redirect("http://localhost:3000/login");
  res.status(401);
};

// Check cookie for login
exports.check_cookie = (req, res) => {
  const cook = Object.values(req.cookies).toString();
  jwt.verify(cook, jwtSecret, (err, data) => {
    if (err) {
      let result = { error: 1 };
      res.send(result);
      res.status(401);
    } else {
      result = data.id;
      res.send({ userId: data.id });
      //res.sendStatus(200);
    }
  });
};

exports.update_user_product = (req, res) => {
  const cook = Object.values(req.cookies).toString();
  jwt.verify(cook, jwtSecret, (err, data) => {
    console.log(data.id);
    if (err) {
      res.status(401);
      res.redirect("http://localhost:3000/login");
      console.log(err);
    } else {
      const header = req.body.inpFilledHeader;
      const condition = req.body.inpFilledCondition;
      const price = req.body.inpFilledPrice;
      const description = req.body.inpFilledDescription;
      const telephone = req.body.inpFilledTel;
      const inpId = req.body.inpId;

      let comand = `UPDATE products SET header = '${header}', price = '${price}', description = '${description}', prod_condition = '${condition}', user_tel = '${telephone}' WHERE id = ${inpId}`;
      db.connection.query(comand, (err, result) => {
        if (err) {
          console.log("Ошибочка " + err);
        } else {
          res.status(200);
          res.redirect("http://localhost:3000/cabinet/userproduct/");
        }
      });
    }
  });
};

exports.delete_user_product = (req, res) => {
  const cook = Object.values(req.cookies).toString();
  jwt.verify(cook, jwtSecret, (err, data) => {
    console.log(data.id);
    if (err) {
      res.status(401);
      res.redirect("http://localhost:3000/login");
      console.log(err);
    } else {
      const id = req.body.delId;
      const comand = `DELETE FROM products WHERE id = ${id}`;
      db.connection.query(comand, (err, result) => {
        if (err) {
          console.log("Ошибочка " + err);
        } else {
          const comand = `SELECT * FROM products WHERE user_id = ${data.id}`
          db.connection.query(comand, (err, result) => {
            if(err) {
              res.status(401);
              res.redirect("http://localhost:3000/login");
              console.log(err);
            } else {
              res.send(result)
            }
          })
        }
      });
      
    }
  });
};

exports.search = (req, res) => {
  const condition = req.body.condition;
  const category = req.body.category;
  const search = req.body.search;

  console.log(condition, "|", category, "|", search);
  let comand = `SELECT * FROM products WHERE (header LIKE '${search}%' AND category_id = '${category}') OR (header LIKE '${search}%'  AND prod_condition = '${condition}') OR (header LIKE '${search}%' AND category_id = '${category}' AND prod_condition = '${condition}') OR (header LIKE '${search}%')`;
  db.connection.query(comand, (err, result) => {
    if (err) {
      console.log("Ошибочка " + err);
    } else {
      console.log(result);
      res.send(result);
      res.status(200);
    }
  });
};

exports.allCategories = (req, res) => {
  db.connection.query("SELECT * FROM categories", (err, result) => {
    if (err) {
      console.log("Ошибочка " + err);
    } else {
      res.status(200);
      res.send(result);
    }
  });
};
