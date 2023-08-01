import Model from "../models/models.editor.js";
import { validationResult } from "express-validator";

const userInfo = (req, res) => {
  console.log('hit', req.cookies);
    if (!req.cookies || !req.cookies.session) {
      res.status(401).send('bummer')
      // res.sendStatus(401);
    }
    const session = req.cookies.session || '';
    Model.userInfo(session)
      .then((response) => {
        response.loggedIn ? res.status(200).json(response) : res.status(401).send('Go away');
      })
};

const Controller = {
  userInfo
}

export default Controller;