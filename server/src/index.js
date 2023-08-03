import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "node:path";
import cookieParser from "cookie-parser";
import { snsRouter } from "./routes/routes.sns.js";
import { aiRouter } from "./routes/routes.ai.js";
import { editorRouter } from "./routes/routes.editor.js";
import openid from 'express-openid-connect';
import axios from 'axios';
dotenv.config();

process.env.PORT = 3000;
if (!process.env.PORT) {
  process.exit(1);
}


const PORT = parseInt(process.env.PORT, 10);
const app = express();
const corsOrigin ={
    origin:'http://localhost:5173', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.use(cookieParser());
app.use(express.json());
//app.use(jwtCheck);
app.use(fileUpload());
app.use(express.static("../frontEnd/dist"));

app.use("/sns", snsRouter);
app.use("/ai", aiRouter);
app.get("/authorized", function (req, res) {
  res.send("Secured Resource");
});

const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: 'http://localhost:3000',
  clientID: 'T8nU2M0ftoL2hxWZFCvHV7dZ6nsHE4pn',
  issuerBaseURL: 'https://dev-f0xoepuyu2bnmb4k.us.auth0.com',
  secret: 'qSg9uXriEL036HIda3fjYvA-TVv8YRsGUKqnz26yNk3Ri6A9CJqg8OTOWjQ79zaH'
};
app.use(openid.auth(config));

app.get('/apis', (req, res) => {
  res.send(
    req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out'
  )
});

app.get('/callback', (req, res) => {
  console.log(req.url);
  res.send('hello');
});

// The /profile route will show the user profile as JSON
app.get('/profile', openid.requiresAuth(), (req, res) => {
  console.log(req.oidc.user);
  res.send(JSON.stringify(req.oidc.user, null, 2));
});
app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  Object.keys(req.files).forEach((file) => {
    uploadPath = path.resolve("./src/cdn", req.files[file].name);
    console.log(uploadPath);
    //__dirname + '/cdn/' + req.files[file].name;
    let myfile = req.files[file];
    myfile.mv(uploadPath, function (err) {
      console.log("no shot big boi", err);
    });
  });

  res.status(201).send("good i think?");
  // // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  // sampleFile = req.files.sampleFile;
  // uploadPath = __dirname + '/cdn/' + sampleFile.name;
  // console.log('sampleFile', sampleFile);

  // // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv(uploadPath, function(err) {
  //   if (err)
  //     return res.status(500).send(err);

  //   res.send('File uploaded!');
  // });
});
app.use("/editor", editorRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
