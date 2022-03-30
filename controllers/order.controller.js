const db = require("../db/db");

class OrderController {
  async createOrder(req, res) {
    const { description, person_id } = req.body;
    const created_at = new Date();
    const newOrder = await db.query(
      "INSERT INTO orders (description, person_id, created_at) values ($1, $2, $3) RETURNING *",
      [description, person_id, created_at]
    );
    res.json(newOrder.rows[0]);
  }

  //   async getOrders(req, res) {
  //     const orders = await db.query("SELECT * FROM orders");
  //     res.json(orders.rows);
  //   }

  async getOrders(req, res) {
    const personId = req.query.personId;

    const orders = personId
      ? await db.query("SELECT * FROM orders where person_id = $1", [personId])
      : await db.query("SELECT * FROM orders");
    res.json(orders.rows);
  }

  async getOrderById(req, res) {
    const id = req.params.id;
    const order = await db.query("SELECT * FROM orders where id = $1", [id]);
    res.json(order.rows[0]);
  }

  async updateOrder(req, res) {
    const { description, person_id } = req.body;
    const id = req.params.id;
    const updatedOrder = await db.query(
      "UPDATE orders set description = $1, person_id = $2 where id = $3 RETURNING *",
      [description, person_id, id]
    );
    res.json(updatedOrder.rows[0]);
  }

  async deleteOrder(req, res) {
    const id = req.params.id;
    const deletedOrder = await db.query("DELETE FROM orders where id = $1", [
      id,
    ]);
    res.json(deletedOrder.rows[0]);
  }
}

module.exports = new OrderController();
