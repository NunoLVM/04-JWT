const express = require("express");
const app = express();

const usersRouter = require("./router/users");

app.use(express.json());

app.use("/users", usersRouter);

app.listen(process.env.PORT, () => console.log("🚀 Serveur lancé sur http://localhost:" + process.env.PORT));
