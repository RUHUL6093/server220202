const express = require("express");
require("dotenv").config();
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 5000;
app.use(bodyParser.json());
app.use(cors());
// console.log(process.env.DB_USER);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.g4xsc.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
client.connect((err) => {
  const productsCollection = client
    .db("volunteer-network")
    .collection("events");
  app.post("/addProducts", (req, res) => {
    const product = req.body;
    productsCollection.insertOne(product);
  });
  console.log("databaseconnecteed");
});

app.listen(port);
