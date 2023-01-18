require('dotenv').config()

const { REST, Routes } = require('discord.js');
const { Client, GatewayIntentBits, ActivityType, Presence } = require('discord.js')
const noblox = require('noblox.js')

const { readdirSync } = require('fs')

const { Token } = require('./config.json');
const { fileURLToPath } = require('url');

const Bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

Bot.commands = new Map()
const slashCommands = []

const rest = new REST({ version: '10' }).setToken(Token);

const commands = readdirSync('./commands').filter((File) => 
    File.endsWith('.js')
)

const events = readdirSync('./Events')

for (const command of commands) {
	const file = require(`./commands/${command}`)
	Bot.commands.set(file.name.toLowerCase() , file )

	if (file.data) {
		slashCommands.push(file.data)
	}
}

for (const event of events) {
    const file = require(`./Events/${event}`)
    const name = event.split('.')[0]

    Bot.on(name , file.execute.bind(null, Bot))
}

Bot.login(process.env.Token);