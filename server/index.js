const express = require("express");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const userRouter = require("./routes/user");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config({ path: "./config/config.env" });

connectDatabase();

app.use("/", userRouter);

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${process.env.PORT}`);
});
