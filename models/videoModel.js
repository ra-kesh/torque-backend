import mongoose from "mongoose";
import { Videos } from "../data/videoData.js";

const VideoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: "name is required",
      unique: "name must be unique",
    },
    category: {
      type: String,
      required: "category is required",
    },
    description: {
      type: String,
      required: "description is required",
    },
    youtubeId: {
      type: String,
      required: "Url Id is required",
    },
    playing: {
      type: Boolean,
    },
    isUnfinished: {
      type: Boolean,
    },
    elapsedTime: {
      type: Number,
    },
    remainingTime: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Video = mongoose.model("Video", VideoSchema);

function fillVideosCollection() {
  try {
    Videos.forEach(async (video) => {
      const newVideo = new Video(video);
      const savedVideo = await newVideo.save();
      console.log(savedVideo);
    });
  } catch (error) {
    console.log(error);
  }
}

export { Video, fillVideosCollection };
