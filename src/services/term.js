const axios = require('axios');

const url = "http://localhost:5000";

async function getOne(id){

	let resource = url + "/term/" + id;

	let http = await axios.get(resource);

	return http;

}

async function filter(name, description, type, page = 1, count = 10){

	let resource = url + "/term?page=" + page + "&count=" + count;

	if(name != null){
		resource += "&name=" + name;
	}

	if(description != null){
		resource += "&description=" + description;
	}

	if(type != null){
		resource += "&type=" + type;
	}

	let http = await axios.get(resource);

	return http;

}

async function create(name, type, description, text, comment, reference){

	let resource = url + "/term";

	let body = {
		"name": name,
		"type": type,
		"description": description,
		"text": text,
		"comment": comment,
		"reference": reference
	};

	let http = await axios.post(resource, body);

	return http;

}

async function update(id, name, type, description, text, comment, reference){

	let resource = url + "/term";

	let body = {
		"id": id,
		"name": name,
		"type": type,
		"description": description,
		"text": text,
		"comment": comment,
		"reference": reference
	};

	let http =  axios.put(resource, body);

	return http;

}

export default {
	getOne,
	filter,
	create,
	update
};