import expressAsyncHandler from "express-async-handler";
import { Video } from "../models/videoModel.js";
import _ from "lodash";

const getAllVideos = expressAsyncHandler(async (req, res) => {
  const videos = await Video.find({});
  res.status(200).json({ success: true, data: videos });
});

const getVideoDetails = expressAsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const video = await Video.findById(videoId);
  res.status(200).json({ success: true, data: video });
});

const updateVideo = expressAsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const videoUpdates = req.body;
  let video = await Video.findById(videoId);
  video = _.extend(video, videoUpdates);
  await video.save();
  res.status(200).json({ success: true, video });
});
export { getVideoDetails, getAllVideos, updateVideo };
