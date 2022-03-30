const Router = require("express");
const orderController = require("../controllers/order.controller");

const router = new Router();

router.post("/orders", orderController.createOrder);
router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrderById);
router.put("/orders/:id", orderController.updateOrder);
router.delete("/orders/:id", orderController.deleteOrder);

module.exports = router;
