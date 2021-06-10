import { LikedVideos } from "../models/likedVideosModel.js";
import _ from "lodash";
import expressAsyncHandler from "express-async-handler";

export const getAllLikedVideos = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  let likedVideosList = await LikedVideos.findById(userId).populate(
    "likedVideos.video"
  );
  res.status(200).json({ success: true, data: likedVideosList });
});

export const addVideosToLikedVideos = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { video } = req.body;
  let likedVideosList = await LikedVideos.findById(userId);

  if (!likedVideosList) {
    const newLikedVideosList = new LikedVideos({
      _id: userId,
      likedVideos: [{ video: video._id }],
    });
    await newLikedVideosList.save();
    res.status(201).json({ success: true, newLikedVideosList });
  }

  likedVideosList = _.extend(likedVideosList, {
    likedVideos: _.concat(likedVideosList.likedVideos, { video: video._id }),
  });

  await likedVideosList.save();
  res.status(201).json({ success: true, likedVideosList });
});

export const removeVideosFromLikedVideosList = expressAsyncHandler(
  async (req, res) => {
    const { userId, videoId } = req.params;
    let likedVideosList = await LikedVideos.findById(userId);

    likedVideosList = _.extend(likedVideosList, {
      likedVideos: _.filter(
        likedVideosList.likedVideos,
        (item) => item.video.toString() !== videoId
      ),
    });

    await likedVideosList.save();
    res.status(200).json({ success: true, likedVideosList });
  }
);
