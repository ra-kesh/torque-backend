import { WatchLaters } from "../models/watchLaterModel.js";
import _ from "lodash";
import expressAsyncHandler from "express-async-handler";

export const getAllVideosInWatchLater = expressAsyncHandler(
  async (req, res) => {
    const { userId } = req.params;
    const watchLaterVideosList = await WatchLaters.findById(userId).populate(
      "watchLaterVideos.video"
    );
    res.status(200).json({ success: true, data: watchLaterVideosList });
  }
);

export const addVideosToWatchLater = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { video } = req.body;

  let watchLaterVideosList = await WatchLaters.findById(userId);

  if (!watchLaterVideosList) {
    const newWatchLaterVideosList = new WatchLaters({
      _id: userId,
      watchLaterVideos: [{ video: video._id }],
    });

    await newWatchLaterVideosList.save();
    return res.status(201).json({ success: true, newWatchLaterVideosList });
  } else {
    watchLaterVideosList = _.extend(watchLaterVideosList, {
      watchLaterVideos: _.concat(watchLaterVideosList.watchLaterVideos, {
        video: video._id,
      }),
    });

    await watchLaterVideosList.save();
    res.status(201).json({ success: true, watchLaterVideosList });
  }
});

export const removeVideoFromWatchLater = expressAsyncHandler(
  async (req, res) => {
    const { userId, videoId } = req.params;
    let watchLaterVideosList = await WatchLaters.findById(userId);
    watchLaterVideosList = _.extend(watchLaterVideosList, {
      watchLaterVideos: _.filter(
        watchLaterVideosList.watchLaterVideos,
        (item) => item.video.toString() !== videoId
      ),
    });
    await watchLaterVideosList.save();
    res.status(201).json({ success: true, watchLaterVideosList });
  }
);
