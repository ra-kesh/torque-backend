import mongoose from "mongoose";

const WatchLaterSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    watchLaterVideos: [
      {
        video: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const WatchLaters = mongoose.model("WatchLaters", WatchLaterSchema);
