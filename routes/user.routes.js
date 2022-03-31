const Router = require("express");
const userController = require("../controllers/user.controller");

const router = new Router();

router.post("/persons", userController.createPerson);
router.post("/login", userController.personLogin);
router.get("/persons", userController.getPersons);
router.get("/persons/:id", userController.getPersonById);
router.put("/persons/:id", userController.updatePerson);
router.delete("/persons/:id", userController.deletePerson);

module.exports = router;
