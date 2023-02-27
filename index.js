const MAX_TIME_BETWEEN_QUOTE = 3600 * 4 //in seconds
const CLIENT_TOKEN = process.env.CLIENT_TOKEN
const QUOTE_GUILD_ID = process.env.QUOTE_GUILD_ID
const QUOTE_CHANNEL_ID = process.env.QUOTE_CHANNEL_ID

const getQuote = require('./quote.js');

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}


function sendRandomQuoteToChannel(channel) {
	getQuote().then(quote => channel.send("@here " + quote.q))
}
function sendRandomQuotesAtRandomIntervalsToChannel(channel) {
	setTimeout(() => {
		sendRandomQuoteToChannel(channel)
		sendRandomQuotesAtRandomIntervalsToChannel(channel)
	}, getRandomInt(1, MAX_TIME_BETWEEN_QUOTE) * 1000)
}

const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
		} else {
			await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		}
	}
});

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);

	client.guilds.fetch(QUOTE_GUILD_ID).then(guild => {
		guild.channels.fetch(QUOTE_CHANNEL_ID).then(channel => {
			sendRandomQuoteToChannel(channel)
			sendRandomQuotesAtRandomIntervalsToChannel(channel)
		})
	})
});

// Log in to Discord with your client's token
client.login(CLIENT_TOKEN);