const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const router = express.Router();
const usersPath = path.join(__dirname, "..", "data", "users.json");

const readUsers = () => JSON.parse(fs.readFileSync(usersPath, "utf8"));
const writeUsers = (users) => fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: "Utilisateur déjà inscrit" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  users.push({ email, passwordHash });
  writeUsers(users);

  res.status(201).json({ message: "Utilisateur créé ✅" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find((u) => u.email === email);
  if (!user) return res.status(401).json({ message: "Identifiants invalides" });

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return res.status(401).json({ message: "Mot de passe incorrect" });

  const token = jwt.sign({ email }, process.env.SECRET_TOKEN, {
    expiresIn: "1h",
  });

  res.json({ token });
});

module.exports = router;
