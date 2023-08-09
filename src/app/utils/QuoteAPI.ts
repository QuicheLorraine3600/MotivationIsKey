import fetch from "node-fetch"

import DefaultEmbed from "./DefaultEmbed"
import { EmbedBuilder } from "discord.js"

const API_URL_TODAY ="https://zenquotes.io/api/today"
const API_URL_RANDOM ="https://zenquotes.io/api/random"

export interface Quote {
	content: string,
	author: string,
	html: string
}

function getQuoteFromURL(url: string) {
	return new Promise<Quote>((resolve, reject) => {
		fetch(url, {}).then(response => {
			response.json().then(quotes => {
				const quote: Quote = {
					content: quotes[0].q,
					author: quotes[0].a,
					html: quotes[0].h
				}
				resolve(quote)
			})
		}).catch(reject);
	})
}

export function getRandomQuote() {
	return getQuoteFromURL(API_URL_RANDOM)
}

export function getDailyQuote() {
	return getQuoteFromURL(API_URL_TODAY)
}

export function getEmbedOfQuote(quote: Quote) {
	return new Promise<EmbedBuilder>((resolve, reject) => {
		resolve(
			new DefaultEmbed()
				.setAuthor({
					name: quote.author,
					url: "https://en.wikipedia.org/wiki/" + quote.author.replaceAll(" ", "_")
				})
				.setTitle(quote.content)
		)
	})
}