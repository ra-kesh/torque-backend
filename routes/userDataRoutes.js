import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Histories } from "../models/historyModel.js";
import { LikedVideos } from "../models/likedVideosModel.js";
import { WatchLaters } from "../models/watchLaterModel.js";
import { UnfinishedVideos } from "../models/unfinishedVideosModel.js";
import { PlayLists } from "../models/playListModel.js";
const router = express.Router();

router.get(
  "/:userId",
  expressAsyncHandler(async (req, res, next) => {
    const { userId } = req.params;

    const [
      historyVideosList,
      likedVideosList,
      watchLaterVideosList,
      unfinishedVideosList,
      allPlayLists,
    ] = await Promise.all([
      Histories.findById(userId),
      // .populate("historyVideos.video"),
      LikedVideos.findById(userId),
      WatchLaters.findById(userId),
      UnfinishedVideos.findById(userId),
      PlayLists.find({ createdBy: userId }),
    ]);

    res.json({
      success: true,
      data: {
        historyVideos: historyVideosList ? historyVideosList.historyVideos : [],
        likedVideos: likedVideosList ? likedVideosList.likedVideos : [],
        unfinishedVideos: unfinishedVideosList
          ? unfinishedVideosList.unfinishedVideos
          : [],
        watchLaterVideos: watchLaterVideosList
          ? watchLaterVideosList.watchLaterVideos
          : [],
        allPlayLists: allPlayLists,
      },
    });
  })
);

export default router;
