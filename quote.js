const API_URL ="https://zenquotes.io/api/random";

const fetch = require('node-fetch');

function getQuote() {
	return new Promise((resolve, reject) => {
		fetch(API_URL).then(response => {
			response.json().then(quotes => {
				resolve(quotes[0])
			})
		});
	})
}

module.exports= getQuote