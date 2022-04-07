const db = require("../db/db");
require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_KEY);

class PaymentController {
  async createPayment(req, res) {
    const items = req.body.items;
    const ids = items.map((item) => parseInt(item.id));
    const order = await db.query(
      "SELECT * FROM orders WHERE id = ANY($1::int[])",
      [ids]
    );

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        mode: "payment",
        success_url: process.env.SERVER_URL,
        cancel_url: process.env.SERVER_URL,
        line_items: order.rows.map((orderItem) => {
          const lineItem = items.find((item) => item.id === orderItem.id);
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: orderItem.description,
              },
              unit_amount: 1000,
            },
            quantity: lineItem.quantity,
          };
        }),
      });
      res.json({ url: session.url });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

module.exports = new PaymentController();
