const MAX_TIME_BETWEEN_QUOTE = 3600 * 24 //in seconds


function getRandomInt(min, max) {
	min = Math.ceil(min)
	max = Math.floor(max)
	return Math.floor(Math.random() * (max - min)) + min
}


function sendRandomQuotesAtRandomIntervalsToChannel(channel) {
	setTimeout(() => {
		sendRandomQuoteToChannel(channel)
		sendRandomQuotesAtRandomIntervalsToChannel(channel)
	}, getRandomInt(1, MAX_TIME_BETWEEN_QUOTE) * 1000)
}