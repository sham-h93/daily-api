const express = require("express");
const bodyParser = require("body-parser");
const noteRoutes = require("./routes/note-routes");
const authRoutes = require("./routes/auth-routs");
const port = 2000;
const connectDb = require("./database/db");

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:5173");
  res.set(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, authorization, Content-Type, Accept"
  );
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set("Access-Control-Allow-Credentials", true);

  next();
});
app.use("/auth", authRoutes);
app.use("/api", noteRoutes);

connectDb()
  .then(() => {
    console.log("Connected to Database");
    app.listen(port);
    console.log("server started on port: " + port);
  })
  .catch((err) => {
    console.log(err);
  });
