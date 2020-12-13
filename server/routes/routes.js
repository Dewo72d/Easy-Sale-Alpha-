const controller = require("../controllers/controller");
const auth = require("../controllers/auth");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/authConfig");
var express = require("express");
const app = express();
var router = express.Router();

// Create a new user
router.use("/api/registration", controller.registration);
// Login User
router.use("/api/login", auth.logIn);
// Logout User
router.use("/api/logout", controller.logout);
// Show all products
router.use("/api/product_list", controller.product_list);
// Add products
router.use("/api/add_product", controller.add_product_card);
// Show user products
router.use("/api/show_product", controller.show_product_card);
// Check cookie
router.use("/api/check_cookie", controller.check_cookie);
// View cabinet product
router.use("/api/update_user_product", controller.update_user_product);
// Delete user product
router.use("/api/delete_user_product", controller.delete_user_product);
// Search product
router.use("/api/search", controller.search);

// check
router.use("/api/all_categories", controller.allCategories);

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
module.exports = router;
