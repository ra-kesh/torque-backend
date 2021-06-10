import express from "express";
import {
  addVideosToLikedVideos,
  getAllLikedVideos,
  removeVideosFromLikedVideosList,
} from "../controllers/likedVideosController.js";

const router = express.Router();

router.get("/:userId", getAllLikedVideos);
router.post("/:userId", addVideosToLikedVideos);
router.delete("/:userId/:videoId", removeVideosFromLikedVideosList);

export default router;
