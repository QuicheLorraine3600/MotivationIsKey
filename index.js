const CLIENT_TOKEN = process.env.CLIENT_TOKEN
const config = require("./config.json")

const { Client, GatewayIntentBits } = require('discord.js')
const commandHandler = require("./src/commandHandler")
const eventHandler = require("./src/eventHandler")

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	]
})

commandHandler.registerAllCommands(client, config)
eventHandler.registerAllEvents(client, config)

// Log in to Discord with your client's token
client.login(CLIENT_TOKEN)