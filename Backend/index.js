const { connectToMongo } = require("./db");
connectToMongo();
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
app.use(cors({ origin: "http://localhost:3000" }));
// app.use(cors());

app.use(express.json());
app.use("/api/auth/", require("./routes/auth"));
app.use("/api/share/", require("./routes/shareroute"));
app.use("/api/notification/", require("./routes/notificationroute"));

app.get("/", (req, res) => {
  res.send("<h1>Your app is ready with backend connection and api's</h1>");
});
app.listen(port, () => {
  console.log("==========================================================");
  console.log(
    "|| Sharing Calc Backend is Listening at localhost:",
    port,
    " ||"
  );
  console.log("==========================================================");
});
