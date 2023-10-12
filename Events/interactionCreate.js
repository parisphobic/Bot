const { Client, Interaction, Collection } = require('discord.js')
const fs = require('fs')

/**
 * 
 * @param {Client} Bot 
 * @param {Interaction} interaction
 */


module.exports.execute = (Bot, interaction) => {
    if (!interaction.isCommand()) return
    const Command = interaction.commandName
    if (!Bot.commands.has(Command)) return
    
    Bot.commands.get(Command).slashExecute(Bot, interaction)
   
}