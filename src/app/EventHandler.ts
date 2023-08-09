import { Events } from "discord.js";

import Bot from "./Bot"
import logger from "./modules/Logger";

export default class EventHandler {
	constructor(bot: Bot) {
		bot.client.once(Events.ClientReady, c => {
			logger.info(`Ready! Logged in as ${c.user.tag}`);
		});
	}
}