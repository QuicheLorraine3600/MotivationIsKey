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

		// cron.schedule('0 17 * * 7', () => {
		// 	  client.guilds.fetch(QUOTE_GUILD_ID).then(guild => {
		// 		guild.channels.fetch(QUOTE_CHANNEL_ID).then(channel => {
		// 			channel.send({content: ":badminton: :hot_face: Inscriptions au badminton par ici les loulous @here ! https://sport.unil.ch/?pid=80&aid=61#content :muscle:"}).then(message => {
		// 				message.react("✅")
		// 			});
		// 		})
		// 	})
		// })
		
		// cron.schedule('0 16 * * *', () => {
		// 	  client.guilds.fetch(QUOTE_GUILD_ID).then(guild => {
		// 		guild.channels.fetch(QUOTE_CHANNEL_ID).then(channel => {
		// 			channel.send({content: "https://cdn.discordapp.com/attachments/976878611590160385/1083044872153464873/download.jpeg"})
		// 		})
		// 	})
		// })
	})
}

module.exports = {
	registerAllEvents: registerAllEvents
}