const { Client, ActivityType } = require('discord.js')

/**
 * 
 * @param {Client} Bot 
 */

module.exports.execute = async (Bot) => {
    console.log(`${Bot.user.tag} has logged in`)
	Bot.user.setActivity('FroyoTopia', { type: ActivityType.Watching })
	Bot.user.setStatus("idle")

    const BotID = '1064739057067892736'
	const ServerID = '1059654500878655599'
	try {
		console.log('Started refreshing application (/) commands.')

		await rest.put(Routes.applicationGuildCommands(BotID, ServerID), { body: slashCommands })

		console.log('Successfully reloaded application (/) commands.')
	} catch (error) {
		console.error(error)
	}
}