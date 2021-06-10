import express from "express";
import {
  getAllVideosInHistory,
  addVideosToHistory,
  removeVideoFromHistory,
} from "../controllers/historyController.js";

const router = express.Router();

router.get("/:userId", getAllVideosInHistory);
router.post("/:userId", addVideosToHistory);

router.delete("/:userId/:videoId", removeVideoFromHistory);

export default router;
