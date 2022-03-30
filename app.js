const express = require("express");
const userRouter = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", orderRouter);

app.listen(PORT, () => console.log(`${PORT} is listening`));
