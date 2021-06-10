import express from "express";
import {
  addToUnfinishedVideos,
  getAllUnfinishedVideos,
  removeFromUnfinishedVideos,
  updateUnfinishedVideos,
} from "../controllers/unfinishedVideosController.js";

const router = express.Router();

router.get("/:userId", getAllUnfinishedVideos);
router.post("/:userId", addToUnfinishedVideos);
router.delete("/:userId/:videoId", removeFromUnfinishedVideos);
router.post("/:userId/:videoId", updateUnfinishedVideos);

export default router;
