import express from "express";
import UserController from "../controllers/userController";
import {body} from "express-validator";

export const router = express.Router();
router.post('/register',
  body("username")
  .notEmpty()
  .withMessage("Username is required")
  .isLength({min: 3, max: 50})
  .withMessage("Must be at least 3 chars long and 50 chars less")
  .matches(/^[A-Za-z0-9 .,'!&]+$/),

  body("password")
  .notEmpty()
  .withMessage("Username is required")
  .isLength({min: 5, max: 50})
  .withMessage("Must be at least 5 chars long and 50 chars less")
  .matches(/^[A-Za-z0-9 .,'!&]+$/),
  UserController.register
)
router.post('/login', UserController.login)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)