const Router = require("express");
const noteController = require("../controllers/note.controller");

const router = new Router();

router.post("/notes", noteController.createNote);
router.get("/notes", noteController.getNotes);
router.get("/notes/:id", noteController.getNoteById);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;
