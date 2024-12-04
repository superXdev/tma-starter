import express from "express";
import { createUser, getRefferals } from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);
router.post("/reff", getRefferals);

export default router;
