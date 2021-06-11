import _ from "lodash";
import expressAsyncHandler from "express-async-handler";

import { PlayLists } from "../models/playListModel.js";

export const getAllPlayListsOfUser = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  let allPlayListsOfUser = await PlayLists.find({ createdBy: userId });
  res.status(200).json({ success: true, allPlayListsOfUser });
});

export const addNewPLayListName = expressAsyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { playListName } = req.body;

  const newPlayList = new PlayLists({
    createdBy: userId,
    playListName,
  });
  await newPlayList.save();
  res.status(200).json({ success: true, data: newPlayList });
});

export const getSinglePlaylist = expressAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const playlist = await PlayLists.findById(playlistId);
  res.status(200).json({ success: true, playlist });
});

export const updatePlayListName = expressAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { newName } = req.body;

  const playlist = await PlayLists.findByIdAndUpdate(
    playlistId,
    {
      playListName: newName,
    },
    { new: true }
  );
  res.status(200).json({ success: true, playlist });
});

export const addOrRemoveVideos = expressAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { videoId } = req.body;

  const playlist = await PlayLists.findById(playlistId);

  const isVideoInPlaylist = playlist.playListVideos.includes(videoId);

  isVideoInPlaylist
    ? playlist.playListVideos.pull(videoId)
    : playlist.playListVideos.push(videoId);

  await playlist.save();
  res.status(200).json({ success: true, updatedPlaylist: playlist });
});

export const deletePlaylist = expressAsyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  await PlayLists.findByIdAndDelete(playlistId);

  res
    .status(200)
    .json({ success: true, message: "playlist deleteed successfully" });
});
