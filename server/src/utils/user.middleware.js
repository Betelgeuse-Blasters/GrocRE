import {db} from './db.server.js';
import Model from "../models/models.editor.js";



let userInfo = (req, res, next) => {
    if (!req.cookies || !req.cookies.session) {
      console.log('Request does not have a session attached. utils/user.middleware.js');
      req.userInfo = {
        loggedIn : false
      }
      next();
    }else{
        const session = req.cookies.session || '';
        Model.userInfo(session)
        .then((response) => {
            req.userInfo = response;
            next();
        })
    }
}

export {userInfo}