import * as model from "../models/models.sns.js";
import { validationResult } from "express-validator";


export async function getAllPosts(req, res) {
  try {
    console.log(req.body);
    res.sendStatus(201)
  } catch (err) {
    console.log('get all posts error: ', err)
    res.status(550).send(err)
  }
}