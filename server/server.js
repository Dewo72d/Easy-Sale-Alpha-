const express = require("express");
const bParser = require("body-parser");
const passport = require("passport");
const app = express();
const port = 4000;
const cookieParser = require("cookie-parser");


app.use(bParser.json());

app.use(
  bParser.urlencoded({
    extended: true,
  })
);


app.use(cookieParser());
app.use(require("./routes/routes"));

app.use(function (req, res, next) {
  res.status(404).send("Sorry cant find that!");
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
