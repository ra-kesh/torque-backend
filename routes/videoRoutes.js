import express from "express";
import {
  getAllVideos,
  getVideoDetails,
  updateVideo,
} from "../controllers/videoControllers.js";

const router = express.Router();

router.get("/", getAllVideos);
router.get("/:videoId", getVideoDetails);
router.post("/:videoId", updateVideo);

export default router;
