import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { join } from "path";
import { rootRouter } from "./routes/root.js";
import { userRouter } from "./routes/userRouter.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";
import { connectDB } from "./config/dbConn.js";
import mongoose from "mongoose";
import { logEvents } from "./middleware/logger.js";
import { noteRouter } from "./routes/noteRouter.js";

const app = express();
const PORT = process.env.PORT || 3500;

connectDB();

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(join(import.meta.dirname, "public")));

app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.all("{*path}", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(join(import.meta.dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 not Found" });
  } else {
    res.type("text").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
});

mongoose.connection.on("error", error => {
  console.log(error);
  logEvents(`${error.no}: ${error.code}\t${error.syscall}\t${error.hostname}`, "mongoErrorLog.log");
});