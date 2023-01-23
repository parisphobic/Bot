const { Client , Message, CommandInteraction} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'wave',
    description: "wave",
    cooldown: 0,
    data : new SlashCommandBuilder() 
   .setName('wave')
   .setDescription('wave'),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
     interaction.reply('hai!')
   }
}