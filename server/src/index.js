import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { snsRouter } from "./routes/routes.sns";
import { aiRouter } from "./routes/routes.ai";
import { editorRouter } from "./routes/routes.editor";
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}
const PORT = parseInt(process.env.PORT, 10);
const app = express();

app.use(cors());
app.use(express.json());

app.use("/sns", snsRouter);
app.use("/ai", aiRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
