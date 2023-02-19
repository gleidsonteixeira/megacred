const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

const userControl = require("./routes/user");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.use("/users", userControl);

app.use((req, res, next) => {
  res.status(404).send("Página não encontrada");
});

app.listen(port, () => {
  console.log(`Servidor: http://localhost:${port}`);
});
