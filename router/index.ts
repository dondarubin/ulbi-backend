import express from "express";
import { userController } from "../controllers/userController";

export const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/refresh', userController.refresh)