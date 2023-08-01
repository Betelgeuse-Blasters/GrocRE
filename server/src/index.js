import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import axios from "axios";
import { auth } from "express-oauth2-jwt-bearer";

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

app.use("/sns", (req, res) => {
  res.send("THIS IS THE ENDPOINT FOR SNS");
});
app.use("/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
