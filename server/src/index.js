import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "node:path";

import { snsRouter } from "./routes/routes.sns.js";
import { aiRouter } from "./routes/routes.ai.js";
import { editorRouter } from "./routes/routes.editor.js";
dotenv.config();
process.env.PORT = 3000;
if (!process.env.PORT) {
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const app = express();

const jwtCheck = auth({
  audience: "grocreServer",
  issuerBaseURL: "https://dev-f0xoepuyu2bnmb4k.us.auth0.com/",
  tokenSigningAlg: "RS256",
}).unless({ path: ["/"] });

app.use(jwtCheck);
app.use(cors());
app.use(express.json());
app.use(fileUpload());
app.use(fileUpload());

app.use("/sns", (req, res) => {
  res.send("THIS IS THE ENDPOINT FOR SNS");
});
app.use("/ai", aiRouter);

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
