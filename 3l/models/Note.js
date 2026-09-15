import mongoose from "mongoose";
import { AutoIncrement } from "mongoose-sequence";

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User",
    },
    title: {
      type: String,
      require: true,
    },
    text: {
      tyrp: String,
      require: true,
    },
    completed: {
      tyrp: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500,
});

export default mongoose.model("Note", noteSchema);
