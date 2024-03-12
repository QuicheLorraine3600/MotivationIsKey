import cron from "node-cron"

import { DB } from "../modules/Database";
import sendWebhookMessageToChannel from "../utils/WebhookMessage"
import Bot from "../Bot";
import { Guild, GuildBasedChannel, TextChannel } from "discord.js";
import logger from "./Logger";

export interface AccountingEntry {
	sending_monkey: string, 
	receiving_monkey: string,
	amount: number,
	unit: string, 
	paid: number // Booleans are not supported by SQLite, 0 means unpaid, 1 means paid
}

function scheduleMessage(bot: Bot, entr: AccountingEntry) {
	/*
	registerChannelCronTask(bot, scheduledMessage.guildId, scheduledMessage.channelId, scheduledMessage.cron, (channel) => {
		if (channel instanceof TextChannel) {
			logger.info("Message sent !")
			sendWebhookMessageToChannel(channel, scheduledMessage.author, scheduledMessage.avatar, scheduledMessage.message).catch(error => {})
			// channel.send(scheduledMessage.message).catch(error => {})
		}
	})*/
	// Euh pas ça mais ouais

}

export function getUnpaidedAccountingEntriesFromDB(bot: Bot) {
	DB.serialize(() => {			
		DB.each("SELECT * FROM accounting WHERE paid = 0", (err, entr: AccountingEntry) => {
			// TODO Prince : genre le bot envoie un message avec l'accounting entry
			//scheduleMessage(bot, entr)
		});
	});

	// should send a message for each unpaid entry, ideally pinging the monkey that must pay
}

export function registerNewPendingPayment(entr: AccountingEntry) {
	scheduleMessage(bot, scheduledMessage)
	DB.serialize(() => {
		const stmt = DB.prepare("INSERT INTO accounting (sending_monkey, receiving_monkey, amount, unit, paid) VALUES (?, ?, ?, ?, ?)");			
		stmt.run(entr.sending_monkey, entr.receiving_monkey, entr.amount, entr.unit, entr.paid)		
	});
}