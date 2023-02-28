const quoteAPI = require('../quoteAPI.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('motivateme')
		.setDescription('Gimme motivation plz'),
	async execute(interaction) {
		quoteAPI.getRandomQuote().then(quote => {
			quoteAPI.getEmbedOfQuote(quote).then(embed => {
				interaction.reply({embeds: [embed] });
			})
		})
	},
};
