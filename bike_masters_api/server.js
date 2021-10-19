import http from "http";
import dotenv from "dotenv";
import path, { join, resolve } from "path";
import app from "./src/app.js";

dotenv.config({
  path: join(resolve(), "./src/config/", ".env"),
});

const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
