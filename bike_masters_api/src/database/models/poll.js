import database from "../database.js";
import mongoose from "mongoose";

const pollSchema = new database.Schema({
  dateState: {
    type: String,
    required: true,
  },
  timeState: {
    type: String,
    required: true,
  },
  selectedPaths: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Path",
    },
  ],
  votes: {
    type: Array,
    default: [],
  },

  comments: {
    type: Array,
    default: [],
  },
});

const Poll = database.model("Poll", pollSchema);

export default Poll;
