import express from "express";
import { join } from "path";

export const router = express.Router();

router.get(["/", "/index", "/index.html"], (req, res) => {
  res.sendFile(join(import.meta.dirname, "..", "views", "index.html"));
});
