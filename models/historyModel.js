import mongoose from "mongoose";

const HistorySchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    historyVideos: [
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

export const Histories = mongoose.model("Histories", HistorySchema);
