import database from "../database.js";

const pathsSchema = new database.Schema({
  routeImg: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  abbreviation: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    required: true,
  },
});

const Paths = database.model("Path", pathsSchema);

export default Paths;
