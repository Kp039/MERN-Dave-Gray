import express from "express";
import noteController from "../controllers/noteController.js";
import verifyJWT from "../middleware/verifyJWT.js";

export const noteRouter = express.Router();

noteRouter.use(verifyJWT);

noteRouter
  .route("/")
  .get(noteController.gettAllNotes)
  .post(noteController.createNewNote)
  .patch(noteController.updateNote)
  .delete(noteController.deleteNote);
