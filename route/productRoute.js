const express = require("express");
const Product = require("../modules/product.modules");
const { getProducts, createProducts, getProductById, updateProduct, deleteProduct } = require("../controller/productController.js");
const router = express.Router();

router.get("/", getProducts);
router.post("/", createProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;