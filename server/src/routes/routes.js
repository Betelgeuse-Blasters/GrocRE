import express from "express";
import { body, param, query } from "express-validator";
import * as controller from "../controller/controller";

export const router = express.Router();

router.get("whatever", controller);
