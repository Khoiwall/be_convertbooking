import express from "express";
import businessController from "../../controllers/business.controller";
const router = express.Router();

router.get(
  "/v1/get-customer/:numberCustomer/:idBusiness",
  businessController.getCustomerByBusiness
);
router.get(
  "/v1/send-email/:email/:idCustomer/:idBusiness",
  businessController.sendEmailInviteMarking
);
router.get(
  "/v1/get-video/:idBusiness",
  businessController.getVideoByIdBusiness
);
router.get(
  "/v1/get-product-by-business/:idBusiness",
  businessController.getProductByBusiness
);
router.post("/v1/submit-video", businessController.submitVideo);
// router.post(
//   "/v1/add-customer/:idBusiness",
//   businessController.checkCustomerExitBusiness,
//   businessController.createCustomer
// );

export default router;
