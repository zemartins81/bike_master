import express from "express";
import cors from "cors";
import morgan from "morgan";

import defaultRouter from "./routes/defaultRouter.js";
import { join } from "path";
import * as path from "path";

const __dirname = path.resolve();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use("/images", express.static(join(__dirname, "./src/public/img")));

app.use(defaultRouter);

export default app;
