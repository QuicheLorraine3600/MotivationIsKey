const getQuote = require('../quote.js');
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('publicdomain')
		.setDescription('https://paypal.me/KyloRen3600'),
	async execute(interaction) {
		interaction.reply("https://github.com/QuicheLorraine3600/MotivationIsTheKey")
	},
};
