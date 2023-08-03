import express from "express";
import { body } from "express-validator";
import { loginOrSignup } from '../controller/controller.auth.js';

const authRouter = express.Router();

authRouter.post('/login', loginOrSignup);

export { authRouter };