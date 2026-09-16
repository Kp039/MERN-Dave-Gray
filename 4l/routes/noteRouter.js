import express from "express";
import noteController from "../controllers/noteController.js";

export const noteRouter = express.Router();

noteRouter
  .route("/")
  .get(noteController.gettAllNotes)
  .post(noteController.createNewNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);