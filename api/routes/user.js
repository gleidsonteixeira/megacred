const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");

router.get("/", (req, res) => {
  res.send(controller.index());
});

router.get("/all", (req, res) => {
  res.send(controller.all());
});

router.get("/:id", (req, res) => {
  res.send(controller.only(req.params.id));
});

router.post("/", (req, res) => {
  res.send(controller.store());
});

router.post("/:id/edit", (req, res) => {
  res.send(controller.update(req.body, req.params.id));
});

router.delete("/:id", (req, res) => {
  res.send(controller.destroy(req.params.id));
});

module.exports = router;
