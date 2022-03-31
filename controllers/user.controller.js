const db = require("../db/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateJWT = (id, nickname) => {
  return jwt.sign({ id, nickname }, "secret_key", {
    expiresIn: "1m",
  });
};

class UserController {
  async createPerson(req, res) {
    const { name, nickname, password } = req.body;
    const created_at = new Date();

    const findPerson = await db.query(
      "SELECT * FROM persons where nickname = $1",
      [nickname]
    );

    if (findPerson.rows.length)
      return res.status(404).send("Person already exists.");

    const hashPassword = await bcrypt.hash(password, 5);
    const newPerson = await db.query(
      "INSERT INTO persons (name, nickname, created_at, password) values ($1, $2, $3, $4) RETURNING *",
      [name, nickname, created_at, hashPassword]
    );

    const token = generateJWT(newPerson.id, nickname);

    res.json({ token });
  }

  async personLogin(req, res) {
    const { nickname, password } = req.body;

    const person = await db.query("SELECT * FROM persons where nickname = $1", [
      nickname,
    ]);

    if (!person.rows.length)
      return res.status(404).send("Person doesn't exist.");

    const comparePassword = bcrypt.compareSync(
      password,
      person.rows[0].password
    );
    if (!comparePassword)
      return res.status(404).send("Login data doesn't match.");

    const token = generateJWT(person.rows[0].id, nickname);

    res.json({ token });
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
