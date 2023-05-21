const util = require("util");
const gis = util.promisify(require('g-i-s'));

// function getRandomInt(max) {
// 	return Math.floor(Math.random() * max);
// }

function searchImage(query) {
	return new Promise((resolve, reject) => {
		// gis(query).then((results) => resolve(results[getRandomInt(results.length)].url))
		gis(query).then((results) => {
			console.log(results)
			resolve("a")
			// resolve(results[0].url)
	})
	})	
}

module.exports = searchImage