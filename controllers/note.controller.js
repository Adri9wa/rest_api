const db = require("../db/db");

class NoteController {
  async createNote(req, res) {
    const { text, person_id, order_id } = req.body;
    const created_at = new Date();
    const newNote = await db.query(
      "INSERT INTO notes (text, person_id, order_id, created_at) values ($1, $2, $3, $4) RETURNING *",
      [text, person_id, order_id, created_at]
    );
    res.json(newNote.rows[0]);
  }

  async getNotes(req, res) {
    const orderId = req.query.orderId;
    const notes = orderId
      ? await db.query("SELECT * FROM notes where order_id = $1", [orderId])
      : await db.query("SELECT * FROM notes");
    res.json(notes.rows);
  }

  async getNoteById(req, res) {
    const id = req.params.id;
    const note = await db.query("SELECT * FROM notes where id = $1", [id]);
    res.json(note.rows[0]);
  }

  async updateNote(req, res) {
    const { text, person_id } = req.body;
    const id = req.params.id;
    const updatedNote = await db.query(
      "UPDATE notes set text = $1, person_id = $2 where id = $3 RETURNING *",
      [text, person_id, id]
    );
    res.json(updatedNote.rows[0]);
  }

  async deleteNote(req, res) {
    const id = req.params.id;
    const deletedNote = await db.query("DELETE FROM notes where id = $1", [id]);
    res.json(deletedNote.rows[0]);
  }
}

module.exports = new NoteController();
