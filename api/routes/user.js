const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");


router.get("/", async (req, res, next) => {
	try {
		res.send(await controller.all());
	} catch (err) {
		return { error: err.message };
	}
});

router.get("/:id", async (req, res) => {
	try {
		res.send(await controller.find(req.params.id));
	} catch (err) {
		return { error: err.message };
	}
});

router.post("/", async (req, res) => {
	try {
		res.send(await controller.store(req.body));
	} catch (err) {
		return { error: err.message };
	}
});

router.post("/:id", async (req, res) => {
	try {
		res.send(await controller.update(req.body, req.params.id));
	} catch (err) {
		return { error: err.message };
	}
});

router.delete("/:id", async (req, res) => {
	try {
		res.send(await controller.destroy(req.params.id));
	} catch (err) {
		return { error: err.message };
	}
});

module.exports = router;
