const axios = require('axios');

const url = "http://localhost:5000";

async function getAll(){

	let resource = url + "/statement";

	let http = await axios.get(resource);

	return http;

}

module.exports = {
	getAll
};