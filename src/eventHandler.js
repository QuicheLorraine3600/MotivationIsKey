const QUOTE_GUILD_ID = process.env.QUOTE_GUILD_ID
const QUOTE_CHANNEL_ID = process.env.QUOTE_CHANNEL_ID

const { ActivityType, Events } = require("discord.js")
const cron = require('node-cron')

const quoteAPI = require("./quoteAPI.js")

function registerAllEvents(client, config) {
	client.once(Events.ClientReady, c => {
		console.log(`Ready! Logged in as ${c.user.tag}`)
		client.user.setActivity({
			name: "Total Stock",
			type: ActivityType.Watching
		})
		cron.schedule('0 7 * * *', () => {
			  client.guilds.fetch(QUOTE_GUILD_ID).then(guild => {
				guild.channels.fetch(QUOTE_CHANNEL_ID).then(channel => {
					quoteAPI.getDailyQuote().then(quote => {
						quoteAPI.getEmbedOfQuote(quote).then(embed => {
							channel.send({content: ":alarm_clock: Debout les loulous @here ! :muscle::chart_with_upwards_trend:", embeds: [embed] });
						})
					})
				})
			})
		})
	})
}

module.exports = {
	registerAllEvents: registerAllEvents
}