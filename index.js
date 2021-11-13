const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const db = require("./db/dbConfig");

const server = express();

server.use(express.json());
server.use(cors());

server.get("/", (_req, res) => {
  res.send("Server up and running...");
});

server.post("/register", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ message: "must include username and password" });
    }
    const hash = bcrypt.hashSync(password);
    const [newUser] = await db("users")
      .insert({ username, password: hash })
      .returning("*");
    delete newUser.password;
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

server.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      res.status(400).json({ message: "must include username and password" });
    }
    const foundUser = await db("users").where({ username }).first();
    if (bcrypt.compareSync(password, foundUser.password)) {
      delete foundUser.password;
      res.status(200).json(foundUser);
    } else {
      res.status(400).json({ message: "invalid credentials" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

const port = process.env.PORT || 4400;
server.listen(port, () => console.log(`\n**Running on port ${port}**\n`));
