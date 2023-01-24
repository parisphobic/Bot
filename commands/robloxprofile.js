const { Client , Message, CommandInteraction, EmbedBuilder} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const noblox = require('noblox.js')

module.exports = {
    name: 'robloxwhois',
    description: "robloxwhois",
    cooldown: 3000,
    data : new SlashCommandBuilder() 
   .setName('robloxwhois')
   .setDescription('robloxwhois')
   .addStringOption(option => option.setName('user').setDescription(`Username of the person's profile you would like to see.`).setRequired(true)),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
    const user = interaction.options.get('user')
    try
    {
      const id = await noblox.getIdFromUsername(user.value)
      const info = await noblox.getPlayerInfo(id)
      const PlayerThumbnail = await noblox.getPlayerThumbnail([id], '720x720', 'png', true, 'body')
      const AuthorIcon = await noblox.getPlayerThumbnail([id], '720x720', 'png', true, 'headshot')
      const Embed = new EmbedBuilder()
      Embed.setAuthor({name: `@${info.displayName} (${info.username})`, iconURL: AuthorIcon[0].imageUrl, url: `https://roblox.com/users/${id}/profile`})
      Embed.setDescription(info.blurb || 'No description')
      Embed.setThumbnail(PlayerThumbnail[0].imageUrl)
      Embed.setColor('f8c6d9')
      Embed.addFields(
        {name: '\u200B', value: '' },
        {name: 'Join Date: ', value: `${info.joinDate}`},
        {name: 'Friends: ', value: `${info.friendCount}` || '0', inline: true},
        {name: 'Followers: ', value: `${info.followerCount.toLocaleString("en-US")}` || '0', inline: true},
        {name: 'Following: ', value: `${info.followingCount.toLocaleString("en-US")}` || '0', inline: true},
        {name: 'Old Names:', value: `${info.oldNames}` || 'No previous usernames', inline: true},
      ),

      interaction.reply({embeds: [Embed], ephemeral: false})
    }
    catch (err)
    {
      console.log(err)
      const ErrEmbed = new EmbedBuilder()
      ErrEmbed.setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
      ErrEmbed.setColor('ff0000')
      ErrEmbed.setTitle('ERROR!')
      ErrEmbed.setDescription(`Error: ${err.message} | please report this to our bot developer <@937825212769120346> as soon as possible.`)
      ErrEmbed.setTimestamp()
      interaction.reply({embeds: [ErrEmbed], ephemeral: true})
    }
  }
}