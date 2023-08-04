import Model from "../models/models.editor.js";
import { validationResult } from "express-validator";

export const userInfo = (req, res) => {
  console.log('hit', req.cookies);
    if (!req.cookies || !req.cookies.session) {
      res.status(401).send('bummer')
      return;
    }
    const session = req.cookies.session || '';
    Model(session)
    .then((response) => {
      console.log('editor response', response)
      if(response.loggedIn){
        let {password, ...cleaned} = response;
        res.send(cleaned)
      }else{
        res.send(response)
      }
    })
};


export default userInfo;