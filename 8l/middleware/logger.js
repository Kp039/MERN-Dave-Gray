import { format } from "date-fns";
import { v4 as uuid } from "uuid";
import { appendFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export const logEvents = async (message, logFileName) => {
  const dateTime = format(new Date(), "ddMMyyyy\tHH:mm:ss");
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!existsSync(join(import.meta.dirname, "..", "logs"))) {
      await mkdir(join(import.meta.dirname, "..", "logs"));
    }
    await appendFile(
      join(import.meta.dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};

export const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.path}`);
  next();
};
