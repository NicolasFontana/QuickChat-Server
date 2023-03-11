import express from "express";
import createUser from "../controllers/users.js";

const router = express.Router();

router
.post("/register", createUser)
.get("/login", (req, res) => {
  res.send("hola");
});

export default router;
