import { SlashCommandBuilder, TextChannel } from "discord.js";

import Bot from "../../Bot";
import { Command, Interaction } from "../Command";
import { registerNewPendingPayment, AccountingEntry } from "../../modules/AccountingStuff";
export default class Accounting extends Command {
	override get data() {
		return new SlashCommandBuilder()
			.setName('accountingEntry')
			.setDescription('Add an accounting entry for the monkey empire')
			.addUserOption(option =>
				option.setName("sending_monkey")
					.setDescription("The monkey that must pay")
					.setRequired(true)
			)
			.addUserOption(option =>
				option.setName("receiving_monkey")
					.setDescription("The monkey receiving")
					.setRequired(true)
			)
			.addIntegerOption(option =>
				option.setName("amount")
					.setDescription("1-999999 (we prevent int overflow like proper cs monkeys :insert sunglass emoji: ")
					.setMinValue(1).setMaxValue(999999)
					.setRequired(true)
			)
			.addStringOption(option =>
				option.setName("unit")
					.setDescription("Unit of payment: could be bananas, grams of cocaine, barrels of oil...")
					.setRequired(true)
			)
	}

	override async execute(bot: Bot, interaction: Interaction) {
		const sending_monkey = interaction.options.getUser("sending_monkey", true)
		const receiving_monkey = interaction.options.getUser("receiving_monkey", true)
		const amount = interaction.options.getInteger("amount", true)
		const unit = interaction.options.getString("unit", true)
		const channel = interaction.channel
		if (channel instanceof TextChannel) {
			const entr: AccountingEntry = {
				sending_monkey: sending_monkey.username,
				receiving_monkey: receiving_monkey.username,
				amount: amount,
				unit: unit,
				paid: 0
			}

			registerNewPendingPayment(entr)

			interaction.reply({ content: "Accounting entry added !", ephemeral: true })
		}
	}
}