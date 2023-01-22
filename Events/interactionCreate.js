const { Client, Interaction } = require('discord.js')
const ms = require('ms')
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
    
    try{
        Bot.commands.get(Command).slashExecute(Bot, interaction)
    } catch (error){
        interaction.reply("There was an error trying to run this command, please try again later.")
        console.log(error)
    }
}