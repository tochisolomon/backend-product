const express = require("express");
const { loginUser, updateUser, registerUser, getAllUser, getUserById, deleteUser } = require("../controller/userController.js");
const router = express.Router();

// router.get("/", getUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/:id", updateUser);
router.get("/", getAllUser);
router.get("/:id", getUserById)
router.delete("/:id", deleteUser)


module.exports = router;