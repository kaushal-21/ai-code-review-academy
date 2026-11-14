
import mongoose, { Schema } from "mongoose";

const databaseTestSchema = new Schema(
  {
    message: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const DatabaseTest =
  mongoose.models.DatabaseTest ||
  mongoose.model("DatabaseTest", databaseTestSchema);
