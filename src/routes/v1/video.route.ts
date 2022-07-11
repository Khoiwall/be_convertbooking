import express from "express";
import videoController from "../../controllers/video.controller";
const router = express.Router();

router.get("/v1/get-video-by-id/:idVideo", videoController.getVideoById);
router.get(
  "/v1/get-video-by-id-business/:idBusiness",
  videoController.getVideoByIdBusiness
);
router.post("/v1/submit-video", videoController.submitVideo);

export default router;
