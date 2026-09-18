import express from "express";
import { join } from "path";

export const rootRouter = express.Router();

rootRouter.get(["/", "/index", "/index.html"], (req, res) => {
  res.sendFile(join(import.meta.dirname, "..", "views", "index.html"));
});
