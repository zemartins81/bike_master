import express from "express";
import Paths from "../database/models/paths.js";

const pathsRouter = express.Router();

pathsRouter.get("/", async (req, res) => {
  const result = await Paths.find();
  if (!result) res.status(404).send({ message: "not found!" });
  return res.status(200).send(result);
});

pathsRouter.post("/newPath", async (req, res) => {
  const path = req.body;
  const result = await Paths.create(path);
  return res.status(200).send(result);
});

pathsRouter.delete("/delete", async (req, res) => {
  await Paths.deleteMany({});
  return res.status(200).send("ok");
});

export default pathsRouter;
