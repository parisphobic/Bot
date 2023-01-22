require('dotenv').config()

const { REST, Routes, Collection } = require('discord.js');
const { Client, GatewayIntentBits } = require('discord.js')

const { readdirSync } = require('fs')

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

const rest = new REST({ version: '10' }).setToken('MTA2NDczOTA1NzA2Nzg5MjczNg.GA7nRN.-ZcRizcfhMGCPwSobS3XW6ZXZ0OxBVMuD5L_yI');

const commands = readdirSync('./commands').filter((File) => 
    File.endsWith('.js')
)

const events = readdirSync('./Events')

for (const command of commands) {
	const file = require(`./commands/${command}`)
	Bot.commands.set(file.name.toLowerCase() , file)

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
Bot.cooldowns = new Collection()

const BotID = '1064739057067892736'
const ServerID = '1059654500878655599'
rest.put(Routes.applicationGuildCommands(BotID, ServerID), { body: slashCommands })