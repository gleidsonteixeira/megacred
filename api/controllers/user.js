const service = require("../services/user");

async function all() {
	return await service.select();
}

async function find(id) {
	return await service.selectOnly(id);
}

async function store(data) {
	return await service.insert(data);
}

async function update(data, id) {
	return await service.update(data, id);
}

async function destroy(id) {
	return await service.destroy(id);
}

module.exports = {
	all,
	find,
	store,
	update,
	destroy
}