import mongoose from "mongoose";

const LikedVideosSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likedVideos: [
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

export const LikedVideos = mongoose.model("LikedVideos", LikedVideosSchema);
