const getQuote = require('../quote.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('motivateme')
		.setDescription('Gimme motivation plz'),
	async execute(interaction) {
		getQuote().then(quote => {
			interaction.reply(quote.q);
		})
	},
};
