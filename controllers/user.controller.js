const db = require("../db/db");
class UserController {
  async createPerson(req, res) {
    const { name, nickname } = req.body;
    const created_at = new Date();
    const newPerson = await db.query(
      "INSERT INTO persons (name, nickname, created_at) values ($1, $2, $3) RETURNING *",
      [name, nickname, created_at]
    );
    res.json(newPerson.rows[0]);
  }

  async getPersons(req, res) {
    const persons = await db.query("SELECT * FROM persons");
    res.json(persons.rows);
  }

  async getPersonById(req, res) {
    const id = req.params.id;
    const person = await db.query("SELECT * FROM persons where id = $1", [id]);
    res.json(person.rows[0]);
  }

  async updatePerson(req, res) {
    const { name, nickname } = req.body;
    const id = req.params.id;
    const updatedPerson = await db.query(
      "UPDATE persons set name = $1, nickname = $2 where id = $3 RETURNING *",
      [name, nickname, id]
    );
    res.json(updatedPerson.rows[0]);
  }

  async deletePerson(req, res) {
    const id = req.params.id;
    const deletedPerson = await db.query("DELETE FROM persons where id = $1", [
      id,
    ]);
    res.json(deletedPerson.rows[0]);
  }
}

module.exports = new UserController();
