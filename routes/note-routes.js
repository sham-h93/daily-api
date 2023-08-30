const express = require("express");
const router = express.Router();
const notesControllers = require("../controllers/notes-controllers");
const authorization = require("../middlewares/auth");

router.use(authorization).get("/notes", notesControllers.getNotes);
router.use(authorization).post("/find-notes", notesControllers.filterNotes);
router.use(authorization).get("/note", notesControllers.getNoteById);
router.use(authorization).post("/new-note", notesControllers.addNote);
router
  .use(authorization)
  .delete("/delete-note", notesControllers.deleteNoteById);

module.exports = router;
