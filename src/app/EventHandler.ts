import { ActivityType, Events, TextChannel } from "discord.js";

import Bot from "./Bot"
import logger from "./modules/Logger";

import { loadMessagesFromDB, registerChannelCronTask } from "./modules/CronScheduler"
import { getDailyQuote, getEmbedOfQuote } from "./modules/QuoteAPI";


export default class EventHandler {
	constructor(bot: Bot) {
		bot.client.once(Events.ClientReady, c => {
			logger.info(`Ready! Logged in as ${c.user.tag}`);

			bot.client.user?.setActivity({
				name: "Total Stock",
				type: ActivityType.Watching
			})

			loadMessagesFromDB(bot)

			// Our beloved daily quote at 7 am
			registerChannelCronTask(bot, "975776769435107419", "983510457421819954", "0 7 * * *", (channel) => {
				if (channel instanceof TextChannel) {
					getDailyQuote().then(quote => {
						getEmbedOfQuote(quote).then(embed => {
							channel.send({ content: ":alarm_clock: Debout les loulous @here ! :muscle::chart_with_upwards_trend:", embeds: [embed] })
						})
					})
				}
			})
		});
	}
}