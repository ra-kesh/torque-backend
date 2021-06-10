import express from "express";
import {
  addVideosToWatchLater,
  removeVideoFromWatchLater,
  getAllVideosInWatchLater,
} from "../controllers/watchLaterController.js";

const router = express.Router();

router.get("/:userId", getAllVideosInWatchLater);
router.post("/:userId", addVideosToWatchLater);

router.delete("/:userId/:videoId", removeVideoFromWatchLater);

export default router;
