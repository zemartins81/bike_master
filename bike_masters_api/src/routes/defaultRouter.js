import express from "express";
import pathsRouter from "./pathsRouter.js";
import pollRouter from "./pollRouter.js";

const defaultRouter = express.Router();

defaultRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

defaultRouter.use("/paths", pathsRouter);
defaultRouter.use("/poll", pollRouter);

export default defaultRouter;
