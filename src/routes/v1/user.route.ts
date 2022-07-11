import express from "express";
import userController from "../../controllers/user.controller";
const router = express.Router();

router.get(
  "/v1/get-business-by-id/:idBusiness",
  userController.checkLogin,
  userController.getBusinessById
);
router.post("/v1/sign-up", userController.signUp);
router.post("/v1/sign-in", userController.signIn);

export default router;
