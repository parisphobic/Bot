const { Client , Message, CommandInteraction, EmbedBuilder} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')
const noblox = require('noblox.js')

module.exports = {
    name: 'robloxwhois',
    description: "robloxwhois",
    cooldown: 0,
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
    let user = interaction.options.get('user')
    await interaction.deferReply({ephemeral: true})
    try
    {
      const id = await noblox.getIdFromUsername(user)
      const info = await noblox.getPlayerInfo(id)
      const PlayerThumbnail = await noblox.getPlayerThumbnail([id], '720x720', 'png', true, 'body')
      const AuthorIcon = await noblox.getPlayerThumbnail([id], '720x720', 'png', true, 'headshot')
      const Embed = new EmbedBuilder()
      Embed.setAuthor({name: `@${(await info).displayName} (${user})`, iconURL: AuthorIcon[0].imageUrl, url: `https://roblox.com/users/${id}/profile`})
      Embed.setDescription((await info).blurb || 'No description')
      Embed.addFields(
        {name: 'Join Date: ', value: (await info).joinDate},
        {name: 'Friends: ', value: (await info).friendCount},
        {name: 'Followers: ', value: (await info).followerCount},
        {name: 'Following: ', value: (await info).followingCount},
      )
      Embed.setThumbnail(PlayerThumbnail[0].imageUrl)

      interaction.editReply({embeds: Embed})
    }
    catch (err)
    {
      console.log(err)
      interaction.editReply({content: `Error: ${err.message} | please report this to our bot developer <@937825212769120346> as soon as possible.`, ephemeral: true})
    }
  }
}