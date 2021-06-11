import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";

import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import likedVideosRoutes from "./routes/likedVideosRoutes.js";
import userDataRoutes from "./routes/userDataRoutes.js";
import watchLaterRoutes from "./routes/watchLaterRoutes.js";
import unfinishedVideoRoutes from "./routes/unfinishedVideoRoutes.js";
import playListRoutes from "./routes/playListRoutes.js";

// import { fillVideosCollection } from "./models/videoModel.js";

import {
  errorHandlerMiddleware,
  notFoundMiddleware,
} from "./middlewares/errorMiddleware.js";

import dotenv from "dotenv";
dotenv.config();

// app
const app = express();
app.use(cors());

// database
connectDB();

// fillVideosCollection();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

// cors
// if (process.env.NODE_ENV === "Devlopment") {
//   app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
// }

app.get("/", (req, res) => {
  res.send("bitch ..it's my api..");
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/likedvideos", likedVideosRoutes);
app.use("/api/userdata", userDataRoutes);
app.use("/api/watchlater", watchLaterRoutes);
app.use("/api/unfinished", unfinishedVideoRoutes);
app.use("/api/playlists", playListRoutes);

// error Handellers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// port
const port = process.env.PORT || 800;

app.listen(port, () => {
  console.log(`server is running on ${port}`);
});
