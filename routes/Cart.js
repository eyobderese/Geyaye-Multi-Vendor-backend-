const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addCartItem,
  removeCartItem,
  getCartItem,
} = require("../controllers/cartControllers");

// Route to get all products
router.get("/", auth, getCartItem);

// Route to create a new product
router.post("/", auth, addCartItem);

//router to remove one product
router.delete("/:productId", auth, removeCartItem);

module.exports = router;
