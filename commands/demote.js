const {
  Client,
  Message,
  CommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const roblox = require('noblox.js')
roblox.setCookie(process.env.Cookie)
  const GroupID = 15191865


module.exports = {
  name: "Demote",
  cooldown: 5000,
  data: new SlashCommandBuilder()
    .setName("demote")
    .setDescription("Demote person of your choice.")
    .addStringOption(option =>
      option
        .setName("id")
        .setDescription("The user id of the person you want to demote")
        .setRequired(true)
        .setMinLength(3)
    ),
  /**
   *
   * @param {Client} Bot
   * @param {CommandInteraction} interaction
   */

  async slashExecute(Bot, interaction) {
    const ID = interaction.options.get("id").value
    console.log(ID)
    try {
      const info = await roblox.getPlayerInfo(ID)
      console.log(info)
      const PlayerThumbnail = await roblox.getPlayerThumbnail([ID], '720x720', 'png', true, 'body')
      console.log(PlayerThumbnail)
      const AuthorIcon = await roblox.getPlayerThumbnail([ID], '720x720', 'png', true, 'headshot')
      console.log(AuthorIcon)
     
      //const {newRole, oldRole} = await roblox.demote(GroupID, ID)

      const Embed = new EmbedBuilder()
      Embed.setColor(`f8c6d9`)
      Embed.setTimestamp()
      Embed.setAuthor({name: `@${info.displayName} (${info.username})`, iconURL: AuthorIcon[0].imageUrl, url: `https://roblox.com/users/${id}/profile`})
      Embed.setThumbnail(PlayerThumbnail[0].imageUrl)
      Embed.setDescription(`@${info.displayName} (${info.username}) has been demoted successfully.`)
     // Embed.addFields(
     //   {name: "Previous Rank: ", value: `${oldRole.name}`},
     //   {name: "New Rank: ", value: `${newRole.name}`},
     // ),

      interaction.reply({embeds: Embed})
      
    } catch (err) {
      console.log(err);
      const ErrEmbed = new EmbedBuilder();
      ErrEmbed.setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
      ErrEmbed.setColor("ff0000");
      ErrEmbed.setTitle("ERROR!");
      ErrEmbed.setDescription(
        `Error: ${err.message} | please report this to our bot developer <@937825212769120346> as soon as possible.`
      );
      ErrEmbed.setTimestamp();
      interaction.reply({ embeds: [ErrEmbed], ephemeral: true });
    }
  },
};
