import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUser, updateUser, userapplications } from "../controllers/userController.js";

const router = express.Router();

// GET user
router.post("/get-user", userAuth, getUser);

// UPDATE USER || PUT
router.put("/update-user", userAuth, updateUser);

// APPLICATIONS || POST
router.post("/userapplications",userAuth ,userapplications);

export default router;
