import express from "express";
import customerController from "../../controllers/customer.controller";
const router = express.Router();

router.get(
  "/v1/send-email-for-customer/:idCustomer/:idBusiness",
  customerController.sendEmailRequestVideo
);
router.get(
  "/v1/get-customer-by-id/:idCustomer",
  customerController.getCustomerById
);
router.get(
  "/v1/get-customer-by-business/:idBusiness",
  customerController.getCustomerByIdBusiness
);
router.post(
  "/v1/create-customer-to-business",
  customerController.checkCustomerExitBusiness,
  customerController.createCustomerToBusiness
);
export default router;
