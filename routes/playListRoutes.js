import express from "express";

import {
  getAllPlayListsOfUser,
  addNewPLayListName,
  addOrRemoveVideos,
  getSinglePlaylist,
  deletePlaylist,
  updatePlayListName,
} from "../controllers/playListController.js";

const router = express.Router();

router.get("/:userId", getAllPlayListsOfUser);
router.post("/add/:userId", addNewPLayListName);
router.get("/detail/:playlistId", getSinglePlaylist);
router.post("/video/:playlistId", addOrRemoveVideos);
router.post("/", addNewPLayListName);
router.delete("/delete/:playlistId", deletePlaylist);
router.post("/update/:playlistId", updatePlayListName);

export default router;
