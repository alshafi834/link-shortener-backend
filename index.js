const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("mongoose connected"));

app.use(express.json({ extended: false }));

app.use("/", require("./routers/index"));
app.use("/api/url", require("./routers/url"));

const PORT = 5000;

app.listen(PORT, () => console.log(`app is running on port: ${PORT}`));
