import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "node:path";
import cookieParser from "cookie-parser";

import { snsRouter } from "./routes/routes.sns.js";
import { aiRouter } from "./routes/routes.ai.js";
import { mealRouter } from "./routes/routes.meal.js";
import {userInfo} from "./utils/user.middleware.js";
import { MealPlansRouter } from './routes/routes.mealplans.js';
dotenv.config();

// process.env.PORT = 3000;
if (!process.env.PORT) {
  console.log('Please set the PORT environment variable');
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const app = express();
const corsOrigin = {
  origin: "http://localhost:5173", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOrigin));
app.use(cookieParser());
app.use(express.json());
app.use(userInfo);
app.use(fileUpload());
app.use(express.static("../frontEnd/dist"));

app.get("/callback", (req, res) => {
  console.log(req.url);
  res.send("hello");
});
app.use("/sns", snsRouter);
app.use("/ai", aiRouter);
app.use("/meal", mealRouter)
app.use("/mealplans", MealPlansRouter);

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

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
