const Router = require("express");
const userController = require("../controllers/user.controller");

const router = new Router();

router.post("/person", userController.createUser);

router.get("/person", userController.getUsers);
router.get("/person/:id", userController.getUserById);

router.put("/person", userController.updateUser);

router.delete("/person/:id", userController.deleteUser);

module.exports = router;
