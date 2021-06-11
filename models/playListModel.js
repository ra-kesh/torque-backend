import mongoose from "mongoose";

const PlayListSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    playListName: {
      type: String,
      unique: true,
    },
    playListVideos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const PlayLists = mongoose.model("PlayLists", PlayListSchema);
