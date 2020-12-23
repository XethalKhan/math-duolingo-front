const axios = require('axios');

const url = "http://localhost:5000";

async function getOne(id){

	let resource = url + "/course/" + id;

	let http = await axios.get(resource);

	return http;

}

async function filter(page = 1, count = 10){

	let http = await axios.get('http://localhost:5000/course');

	return http;

}

async function create(name, description, grid, img){

	let resource = url + "/course";

	let body = {
		"name": name,
		"description": description,
		"grid": grid,
		"img": img
	};

	let http = await axios.post(resource, body);

	return http;

}

async function update(id, name, description, grid, img){

	let resource = url + "/course";

	let body = {
		"id": id,
		"name": name,
		"description": description,
		"grid": grid,
		"img": img
	};

	let http = await axios.put(resource, body);

	return http;

}

module.exports = {
	getOne,
	filter,
	create,
	update
};