const Router = require("express");
const paymentController = require("../controllers/payment.controller");

const router = new Router();

router.post("/checkout-stripe", paymentController.createPayment);

module.exports = router;
