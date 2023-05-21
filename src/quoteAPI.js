const API_URL_TODAY ="https://zenquotes.io/api/today";
const API_URL_RANDOM ="https://zenquotes.io/api/random";

const { EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
const searchImage = require("./imageSearch.js")

function getFirstQuoteFromURL(url) {
	return new Promise((resolve, reject) => {
		fetch(url).then(response => {
			response.json().then(quotes => {
				resolve(quotes[0])
			})
		});
	})
}

function getEmbedOfQuote(quote) {
	return new Promise((resolve, reject) => {
		// searchImage(quote.a).then(imageURL => {
			const embed = new EmbedBuilder()
				.setColor(0x0099FF)
				// .setAuthor({ name: quote.a, iconURL: imageURL, url: "https://fr.wikipedia.org/wiki/" + quote.a.replaceAll(" ", "_") })
				.setAuthor({ name: quote.a, url: "https://fr.wikipedia.org/wiki/" + quote.a.replaceAll(" ", "_") })
				.setTitle(quote.q)
				// .setURL('https://www.coinbase.com/fr/price/bitcoin')
			resolve(embed)
		// })	
	})
}

module.exports= {
	getDailyQuote: () => getFirstQuoteFromURL(API_URL_TODAY),
	getRandomQuote: () => getFirstQuoteFromURL(API_URL_RANDOM),
	getEmbedOfQuote: getEmbedOfQuote
}