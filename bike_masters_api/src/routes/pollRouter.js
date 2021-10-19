import express from "express";
import Poll from "../database/models/poll.js";

const pollRouter = express.Router();

pollRouter.post("/", async (req, res) => {
  const newPoll = req.body;
  const result = await Poll.create(newPoll);
  return res.status(201).send(result);
});

pollRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  Poll.findById(req.params.id)
    .populate("selectedPaths")
    .then((poll) => res.status(200).send(poll))
    .catch((err) => res.status(500).json({ message: "Something went wrong" }));
});

pollRouter.get("/", (req, res) => {
  Poll.find()
    .populate("selectedPaths")
    .then((poll) => res.status(200).send(poll))
    .catch((err) => res.status(500).json({ message: "Something went wrong" }));
});

pollRouter.put("/:id", (req, res) => {
  Poll.findByIdAndUpdate(req.params.id, req.body)
    .then((poll) => res.json(poll))
    .catch((err) => res.status(500).json({ message: "Something went wrong" }));
});

export default pollRouter;
