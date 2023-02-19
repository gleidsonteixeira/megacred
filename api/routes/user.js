const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");


router.get("/", async (req, res, next) => {
	try {
		res.send(await controller.all());
	} catch (err) {
		console.error("Erro ao buscar dados", err.message);
		next(err);
	}
});

router.get("/:id", async (req, res, next) => {
	try {
		res.send(await controller.find(req.params.id));
	} catch (err) {
		console.error("Erro ao buscar dados", err.message);
		next(err);
	}
});

router.post("/", async (req, res, next) => {
	try {
		res.send(await controller.store(req.body));
	} catch (err) {
		console.error("Erro ao salvar dados", err.message);
		next(err);
	}
});

router.post("/:id/edit", async (req, res, next) => {
	try {
		res.send(await controller.update(req.body, req.params.id));
	} catch (err) {
		console.error("Erro ao salvar dados", err.message);
		next(err);
	}
});

router.delete("/:id", (req, res) => {
	res.send(controller.destroy(req.params.id));
});

module.exports = router;
