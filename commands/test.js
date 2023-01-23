const { Client , Message, CommandInteraction} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { promisify } = require('util')
const { wait } = promisify(setTimeout)

module.exports = {
    name: 'Test',
    description: "A command for testing",
    cooldown: 5000,
    data : new SlashCommandBuilder() 
   .setName('test')
   .setDescription('Test'),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
     interaction.reply('Test')
   }
}