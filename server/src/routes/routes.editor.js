import express from "express";
import { body } from "express-validator";
import { userInfo } from "../controller/controller.editor.js";
export const editorRouter = express.Router();



editorRouter.get('/api/login', userInfo);

export default { editorRouter }