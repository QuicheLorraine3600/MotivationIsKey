const EMBED_EMPTY_CHAR = "\u200B"
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

function generateVoteFieldEntry(emoji, vote) {
	return {name: emoji + " -> " + vote, value: '\u200B'}
}

function generateEmbedFields(emojis, choice1, choice2, choice3, choice4) {
	const fields = []
	fields.push(generateVoteFieldEntry(emojis[0], choice1))
	fields.push(generateVoteFieldEntry(emojis[1], choice2))
	if (choice3) {
		fields.push(generateVoteFieldEntry(emojis[2], choice3))
	}
	if (choice4) {
		fields.push(generateVoteFieldEntry(emojis[3], choice4))
	}
	return fields
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('votation')
		.setDescription('Faire un vote populaire')
		.addStringOption(option =>
			option.setName('description')
				.setDescription('Description de la votation')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('choice_1')
				.setDescription('Choix 1 (requis)')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('choice_2')
				.setDescription('Choix 2 (requis)')
				.setRequired(true)
		)
		.addStringOption(option =>
			option.setName('choice_3')
				.setDescription('Choix 3 (optionnel)')
				.setRequired(false)
		)
		.addStringOption(option =>
			option.setName('choice_4')
				.setDescription('Choix 4 (optionnel)')
				.setRequired(false)
		),

	async execute(interaction) {
		const description = interaction.options.getString('description');
		const choice1 = interaction.options.getString('choice_1');
		const choice2 = interaction.options.getString('choice_2');
		const choice3 = interaction.options.getString('choice_3');
		const choice4 = interaction.options.getString('choice_4');

		const emojis = ["🐒", "🐵", "🚀", "💪"]
		interaction.guild.emojis.cache.forEach(emoji => {
			if (emoji.animated) {
				emojis.push("<" + emoji.identifier + ">")
			} else {
				emojis.push("<:" + emoji.identifier + ">")
			}
		});
		shuffleArray(emojis)

		const embed = new EmbedBuilder()
			.setColor(0x0099FF)
			.setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.avatarURL() })
			.setTitle("Nouvelle votation :flag_ch:")
			.setDescription(description)
			.addFields(generateEmbedFields(emojis, choice1, choice2, choice3, choice4))
			.setFooter({ text: 'Gouvernement Populaire de la Singerie', iconURL: interaction.guild.iconURL() });
		// .setURL('https://www.coinbase.com/fr/price/bitcoin')
		
		interaction.reply({embeds: [embed], fetchReply: true }).then(reply => {
			reply.react(emojis[0])
			reply.react(emojis[1])
			if (choice3) {
				reply.react(emojis[2])
			}
			if (choice4) {
				reply.react(emojis[3])
			}
		})
	},
};
