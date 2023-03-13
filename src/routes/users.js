import express from "express";
import userControllers from "../controllers/users.js";

const router = express.Router();

router
.post("/register", userControllers.createUser)
.post("/login", userControllers.getUser);

export default router;
