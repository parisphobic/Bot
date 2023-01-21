const { Client , Message, CommandInteraction} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Chanel',
    description: "A command for testing",
    data : new SlashCommandBuilder() 
   .setName('chanel')
   .setDescription('chanel'),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
     interaction.reply('chanel a biggie boo')
   }
}