const { Client, Interaction } = require('discord.js')

/**
 * 
 * @param {Client} Bot 
 * @param {Interaction} interaction
 */

module.exports.execute = (Bot, interaction) => {
    console.log(`Chat Slash Cmd from ${interaction.user.tag}`)

    if (!interaction.isCommand()) return

    const Command = interaction.commandName

    if (!Bot.commands.has(Command)) return

    Bot.commands.get(Command).slashExecute(Bot, interaction)
}