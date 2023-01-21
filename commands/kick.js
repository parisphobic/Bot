const { Client , Message, CommandInteraction, EmbedBuilder, PermissionsBitField} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { promisify } = require('util')
const { demote } = require('noblox.js')
const chanel = require('./chanel')
const { wait } = promisify(setTimeout)

module.exports = {
  name: 'Kick',
    data : new SlashCommandBuilder() 
   .setName('kick')
   .setDescription('Kick person of your choice')
   .addUserOption(option => option.setName('target').setDescription('The person you want to kick').setRequired(true))
   .addStringOption(option => option.setName('reason').setDescription('Reasoning for kick.')),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
     const KickUser = interaction.options.getUser('target')
     const KickMember = await interaction.guild.members.fetch(KickUser.id)

     if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await (interaction.reply({content: 'You do not have permissions to ``Kick``.', ephemeral: true}))
     if (!KickMember) return await (interaction.reply({content: 'The person you mentioned is no longer in the server', ephemeral: true}))
     if (!KickMember.kickable) return await (interaction.reply({content: 'You do not have permissions to ``Kick`` this person because they are either the same rank as you/me, or they are above you/me.', ephemeral: true}))

     let Reason = interaction.options.getUser('reason')
     if (!Reason) Reason = 'No reason given'

     const DmEmbed = new EmbedBuilder()
     DmEmbed.setTitle("You've been kicked from FroyoTopia!")
     DmEmbed.setDescription(`:white_check_mark: | You have been kicked from ${interaction.guild.name} \n Reasoning: ${Reason} `)
     DmEmbed.setAuthor({ name: KickUser.member, iconURL: KickUser.displayAvatarURL() })
     DmEmbed.setColor('2f3136')
     DmEmbed.setThumbnail(interaction.guild.iconURL())
     DmEmbed.setTimestamp()

     await KickMember.send({ embeds: [DmEmbed] }).nocatch(err => {
      return
     })

     const KickEmbed = new EmbedBuilder()
     KickEmbed.setTitle(`${KickUser.tag} has been kicked from ${interaction.guild.name}`)
     KickEmbed.setDescription(`:white_check_mark: | ${KickUser.tag} have been kicked from ${interaction.guild.name} \n Reasoning: ${Reason} `)
     KickEmbed.setAuthor({ name: interaction.member, iconURL: interaction.user.displayAvatarURL() })
     KickEmbed.setColor('2f3136')
     KickEmbed.setThumbnail(interaction.guild.iconURL())
     KickEmbed.setTimestamp()

     await KickMember.kick({ reason: Reason }).catch(err => {
      interaction.reply({ content: 'There was an error please try again later.', ephemeral: true})
     })

     await interaction.reply({embeds: [KickEmbed]})
   }
}