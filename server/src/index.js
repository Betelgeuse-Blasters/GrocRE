import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
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


app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.static('../frontEnd/dist'));

app.use("/sns", snsRouter);
app.use("/ai", aiRouter);
app.use('/editor', editorRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
