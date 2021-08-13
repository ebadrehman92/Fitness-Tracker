const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const mongojs = require("mongojs");

const PORT = process.env.PORT || 4000;

const app = express();

app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// this may need to be changed
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false,
});

// routes
app.use(require("./routes/api"));
app.use(require("./routes/frontend"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
