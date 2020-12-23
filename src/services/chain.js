const axios = require('axios');

const url = "http://localhost:5000";

async function getOne(id){

	let resource = url + "/chain/" + id;

	let http = await axios.get(resource);

	return http;

}

async function filter(name, description, page = 1, count = 10){

	let resource = url + "/chain?page=" + page + "&count=" + count;

	if(name !== null && name !== ""){
		resource += "&name=" + name;
	}

	if(description !== null && description !== ""){
		resource += "&description=" + description;
	}

	let http = await axios.get(resource);

	return http;

}

async function create(name, description, chain){

	let resource = url + "/chain";

	let body = {
		"name": name,
		"description": description,
		"chain": chain
	};

	let http =  axios.post(resource, body);

	return http;

}

async function update(id, name, description, chain){

	let resource = url + "/chain";

	let body = {
		"id": id,
		"name": name,
		"description": description,
		"chain": chain
	};

	let http =  axios.put(resource, body);

	return http;

}

module.exports = {
	getOne,
	filter,
	create,
	update
};