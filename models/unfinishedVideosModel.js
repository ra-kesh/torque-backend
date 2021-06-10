import mongoose from "mongoose";

const UnfinishedVideosSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    unfinishedVideos: [
      {
        video: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
        },
        remainingTime: {
          type: Number,
        },
        elapsedTime: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const UnfinishedVideos = mongoose.model(
  "UnfinishedVideos",
  UnfinishedVideosSchema
);
