const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("index");
});

router.post("/", (req, res) => {
  res.send("Criar");
});

router.post("/:id/edit", (req, res) => {
  res.send("Editar" + req.params.id);
});

router.delete("/:id", (req, res) => {
  res.send("Delete");
});

module.exports = router;
