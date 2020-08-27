import express from "express";
import routes from "../routes";
import {
  deleteVideo,
  videos,
  upload,
  videoDetail,
  editVideo,
} from "../controllers/videoController";

const videoRouter = express.Router();

videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter; //videoRouter문서 전체를 export
