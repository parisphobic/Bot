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

const commands = readdirSync('./commands').filter(File => File.endsWith('.js'))

for (command of commands) {
	const file = require(`./commands/${command}`)
	Bot.commands.set(file.name.toLowerCase() , file )

	if (file.data) {
		slashCommands.push(file.name)
	}
}

console.log(Bot.commands)

Bot.login(Token)

Bot.on('ready', () => {
	console.log(`${Bot.user.tag} has logged in`)
	Bot.user.setActivity('FroyoTopia', { type: ActivityType.Watching })
	Bot.user.setStatus("idle")
});

Bot.on('messageCreate', (message) => {
	if (message.author.bot) return
	if (!message.guild) return

	const prefix = "-"
	const args = message.content.slice(prefix.length).split(/ +/g)
	const command = args.shift().toLowerCase()

	if (!Bot.commands.has(command)) return


	Bot.commands.get(command).execute(Bot, message, args)
});

Bot.on('interactionCreate', (interaction) => {
	if (interaction.isChatInputCommand()) {
		console.log('Chat Command')

		if (!Bot.slashCommands.has(interaction.commandName)) return

		Bot.slashCommands.get(interaction.commandName).execute(Bot, message, args)
	}
});

(async () => {
	const BotID = '1064739057067892736'
	const ServerID = '1059654500878655599'
	try {
		console.log('Started refreshing application (/) commands.')

		await rest.put(Routes.applicationGuildCommands(BotID, ServerID), { body: slashCommands })

		console.log('Successfully reloaded application (/) commands.')
	} catch (error) {
		console.error(error)
	}
})();