// if (process.env.NODE_ENV !== "production") {
//     require("dotenv").config();
//   }

const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const router = require("./routers");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 80;

//db connection
const db = require("./db");
db.connect();

//middleware
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "500mb" }));
app.use(express.json());

//cors headers
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});


//static resourse
app.use("/api", router);
app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));
app.use(express.static(path.join(__dirname, "/../frontend/build")));

app.get("*", (req, res) => {
    try {
      res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`));
    } catch (e) {
      res.send("Oops..! Something went wrong!!");
    }
  });
  
  app.use(cors());
  
  //port
  app.listen(PORT, () => {
    console.log(`AMA API is running on PORT No- ${PORT}`);
  });