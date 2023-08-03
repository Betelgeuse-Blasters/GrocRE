import * as model from "../models/models.auth.js";
import axios from 'axios';
import { validationResult } from "express-validator";
import { config } from "dotenv";
config();


export const loginOrSignup = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { nickname, name, email, password } = req.body;
    let user = await model.findUserByNickname(nickname);

    if (email) { // signup attempt
      let existingUserByEmail = await model.findUserByEmail(email);
      if (existingUserByEmail || user) {
        return res.status(409).json({ message: 'Email or username is taken' });
      }
      user = await model.createUser(nickname,name, email, password);
    } else { // login attempt
      if (!user) {
        return res.status(400).send('User not found');
      }
      // If user exists, verify the password
      const isMatch = await model.comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).send('BAD PASS');
      }
    }
    const session = await model.createSession(user.id);
    res.cookie('sessionId', session.id, {
      httpOnly: true, // prevent client-side JavaScript from accessing the cookie
      secure: process.env.NODE_ENV === 'production', // only send the cookie over HTTPS if in production
      maxAge: 86400000, // cookie expiration time, e.g., 1 day
      // add other cookie options if needed
    });
    res.status(200).json({
      message: 'Successfully logged in or signed up',
      session
    });
  } catch (err) {
    console.log("all hail the meatball man", err);
    res.status(500).send(err);
  }

};

