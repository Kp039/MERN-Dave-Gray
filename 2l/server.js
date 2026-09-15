import express from "express";
import { join } from "path";
import { router as rootRouter } from "./routes/root.js";
import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorhandler.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { corsOptions } from "./config/corsOptions.js";

const app = express();
const PORT = process.env.PORT || 3500;

app.use(logger);

app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use("/", express.static(join(import.meta.dirname, "public")));

app.use("/", rootRouter);

app.all("{*path}", (req, res) => {
  res.status(404)
  if (req.accepts("html")) {
    res.sendFile(join(import.meta.dirname,"views", "404.html"))
  } else if (req.accepts("json")) {
    res.json({message:"404 not Found"})
  } else {
    res.type("text").send("404 Not Found")
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
