import { UnfinishedVideos } from "../models/unfinishedVideosModel.js";
import _ from "lodash";
import expressAsyncHandler from "express-async-handler";

export const getAllUnfinishedVideos = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  let unfinishedVideosList = await UnfinishedVideos.findById(userId).populate(
    "unfinishedVideos.video"
  );
  res.status(200).json({ success: true, data: unfinishedVideosList });
});

export const addToUnfinishedVideos = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { video, remainingTime, elapsedTime } = req.body;

  let unfinishedVideosList = await UnfinishedVideos.findById(userId);

  if (!unfinishedVideosList) {
    const newUnfinishedVideosList = new UnfinishedVideos({
      _id: userId,
      unfinishedVideos: [{ video: video._id, remainingTime, elapsedTime }],
    });

    await newUnfinishedVideosList.save();

    res.status(201).json({ success: true, newUnfinishedVideosList });
  }

  unfinishedVideosList = _.extend(unfinishedVideosList, {
    unfinishedVideos: _.concat(unfinishedVideosList.unfinishedVideos, {
      video: video._id,
      remainingTime,
      elapsedTime,
    }),
  });

  await unfinishedVideosList.save();
  res.status(201).json({ success: true, unfinishedVideosList });
});

export const removeFromUnfinishedVideos = expressAsyncHandler(
  async (req, res) => {
    const { userId, videoId } = req.params;
    let unfinishedVideoList = await UnfinishedVideos.findById(userId);

    unfinishedVideoList = _.extend(unfinishedVideoList, {
      unfinishedVideos: _.filter(
        unfinishedVideoList.unfinishedVideos,
        (item) => item.video.toString() !== videoId
      ),
    });

    await unfinishedVideoList.save();
    res.status(200).json({ succcess: true, unfinishedVideoList });
  }
);

export const updateUnfinishedVideos = expressAsyncHandler(async (req, res) => {
  const { userId, videoId } = req.params;
  const { remainingTime, elapsedTime } = req.body;
  let unfinishedVideoList = await UnfinishedVideos.findById(userId);

  unfinishedVideoList = _.extend(unfinishedVideoList, {
    unfinishedVideos: _.map(unfinishedVideoList.unfinishedVideos, (item) =>
      item.video.toString() === videoId
        ? _.extend(item, {
            remainingTime,
            elapsedTime,
          })
        : item
    ),
  });

  await unfinishedVideoList.save();
  res.status(200).json({ succcess: true, unfinishedVideoList });
});
