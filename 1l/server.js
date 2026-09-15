import express from "express";
import { join } from "path";
import { router as rootRouter } from "./routes/root.js";

const app = express();
const PORT = process.env.PORT || 3500;

app.use("/", express.static(join(import.meta.dirname, "/public")));

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

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`));
