const { Client , Message, CommandInteraction, EmbedBuilder, PermissionsBitField} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { promisify } = require('util')
const { wait } = promisify(setTimeout)

module.exports = {
  name: 'Kick',
    data : new SlashCommandBuilder() 
   .setName('kick')
   .setDescription('Kick person of your choice')
   .addUserOption(option => option.setName('target').setDescription('The person you want to kick').setRequired(true))
   .addUserOption(option => option.setName('reason').setDescription('Reasoning for kick.')),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
     const KickUser = interaction.options.getUser('target')
     const KickMembe = await interaction.guild.members.fetch(KickUser.id)

     if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await (interaction.reply('You do not have permissions to ``Kick``.'))


   }
}