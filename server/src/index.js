import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "node:path";
import cookieParser from "cookie-parser";
import {userInfo} from "./utils/user.middleware.js";
import { snsRouter } from "./routes/routes.sns.js";
import { aiRouter } from "./routes/routes.ai.js";
import {authRouter} from "./routes/routes.auth.js"
import { mealRouter } from "./routes/routes.meal.js";
import { MealsRouter } from './routes/routes.meals.js';
import { MealPlansRouter } from './routes/routes.mealplans.js';
import {editorRouter} from "./routes/routes.editor.js"
dotenv.config();

process.env.PORT = 3000;
if (!process.env.PORT) {
  console.log('Please set the PORT environment variable');
  process.exit(1);
}

const PORT = parseInt(process.env.PORT, 10);
const app = express();
const corsOrigin = {
  origin: ["http://localhost:5173","http://127.0.0.1:5173"], //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOrigin));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(userInfo);
// app.use(fileUpload());
app.use(express.static("../frontEnd/dist"));

app.use("/auth",authRouter)
app.use("/sns", snsRouter);
app.use("/ai", aiRouter);
app.use("/meal", mealRouter)
app.use("/meals", MealsRouter);
app.use("/mealplans", MealPlansRouter);
app.use("/editor",editorRouter)


app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
