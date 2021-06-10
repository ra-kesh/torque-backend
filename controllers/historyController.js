import { Histories } from "../models/historyModel.js";
import _ from "lodash";
import expressAsyncHandler from "express-async-handler";

export const getAllVideosInHistory = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const historyVideosList = await Histories.findById(userId).populate(
    "historyVideos.video"
  );
  res.status(200).json({ success: true, data: historyVideosList });
});

export const addVideosToHistory = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { video } = req.body;

  let historyVideosList = await Histories.findById(userId);

  if (!historyVideosList) {
    const newHistoryVideosList = new Histories({
      _id: userId,
      historyVideos: [{ video: video._id }],
    });

    await newHistoryVideosList.save();
    return res.status(201).json({ success: true, newHistoryVideosList });
  } else {
    historyVideosList = _.extend(historyVideosList, {
      historyVideos: _.concat(historyVideosList.historyVideos, {
        video: video._id,
      }),
    });

    await historyVideosList.save();
    res.status(201).json({ success: true, historyVideosList });
  }
});

export const removeVideoFromHistory = expressAsyncHandler(async (req, res) => {
  const { userId, videoId } = req.params;
  let historyVideosList = await Histories.findById(userId);
  historyVideosList = _.extend(historyVideosList, {
    historyVideos: _.filter(
      historyVideosList.historyVideos,
      (item) => item.video.toString() !== videoId
    ),
  });
  await historyVideosList.save();
  res.status(201).json({ success: true, historyVideosList });
});
