const { Client , Message, CommandInteraction} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { promisify } = require('util')
const { wait } = promisify(setTimeout)

module.exports = {
  name: 'Kick',
    data : new SlashCommandBuilder() 
   .setName('kick')
   .setDescription('Kick person of your choice')
   .addUserOption(option => option.setName('target').setDescription('The person you want to kick')),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    * @param {String[]} args
    */

   async slashExecute(Bot, interaction, args) {
     interaction.reply('Test')
   }
}