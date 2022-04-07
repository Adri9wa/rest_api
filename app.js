const express = require("express");
const userRouter = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");
const noteRouter = require("./routes/note.routes");
const paymentRouter = require("./routes/payment.routes");
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use("/api", userRouter);
app.use("/api", orderRouter);
app.use("/api", noteRouter);
app.use("/api", paymentRouter);

app.listen(PORT, () => console.log(`${PORT} is listening`));
