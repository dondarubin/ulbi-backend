import express from "express";
import UserController from "../controllers/userController";
import {body} from "express-validator";
import {authMiddleware} from "../middlewares/authMiddleware";
import ProfileRepository from "../repositories/profileRepository";
import ProfileController from "../controllers/profileController";

export const router = express.Router();
router.post('/register',
  body("username")
  .notEmpty()
  .withMessage("Username must not be empty")
  .isLength({min: 3, max: 20})
  .withMessage("Username must be at least 3 chars long and 20 chars less")
  .matches(/^[A-Za-z0-9]+$/)
  .withMessage("Username must consist of latin letters and numbers"),

  body("password")
  .notEmpty()
  .withMessage("Password must not be empty")
  .isLength({min: 5, max: 20})
  .withMessage("Password must be at least 5 chars long and 20 chars less")
  .matches(/^[A-Za-z0-9 .,'!&]+$/)
  .withMessage("Password"),
  UserController.register
)

router.post('/login',
  body("username")
  .notEmpty()
  .withMessage("Username must not be empty")
  .isLength({min: 3, max: 50})
  .withMessage("Username must be at least 3 chars long and 50 chars less")
  .matches(/^[A-Za-z0-9]+$/)
  .withMessage("Username can consist of latin letters and numbers"),

  body("password")
  .notEmpty()
  .withMessage("Password must not be empty")
  .isLength({min: 5, max: 20})
  .withMessage("Password must be at least 5 chars long and 20 chars less")
  .matches(/^[A-Za-z0-9 .,'!&]+$/)
  .withMessage("Password can consist of latin letters, numbers and special symbols (.,'!&)"),
  UserController.login
)
router.post('/logout', UserController.logout)
router.get('/refresh', UserController.refresh)
router.get('/users', authMiddleware, UserController.getUsers)
router.get('/profile/:profileId', ProfileController.getProfile)