
import mongoose, { Schema } from "mongoose";

const projectFileSchema = new Schema(
  {
    path: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    language: {
      type: String,
      enum: ["python", "javascript", "typescript"],
      required: true,
    },
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    ownerId: {
      type: String,
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    files: {
      type: [projectFileSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Project =
  mongoose.models.Project ||
  mongoose.model("Project", projectSchema);
