const {
  Client,
  Message,
  CommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const roblox = require('noblox.js')
roblox.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_C9B815A80CA637F71B9366088D1A233776CE358AF4C5638F6551695233907FE2E7707090E295F2FF4EC3CC433D12F5909409998063AF84A4A67E34186ED5F0952D570AC79261AA99C8A363547D361420B0D6033F5D792252F85EBC661C5DE11D8494EF9772E4A4055127C6AC7142902DBAE87BC272FA5ABB0CB788F6157B71753E1962DE48E1BFE991BAD97C8F36E0DB64989D8C0DD443C69B5A3365E3468422AB2C638793EB8476AE1B1B34FCD598D52461E64A2FDB43DD4BE339DA65D3B8D0C9483D5677FC9B1191B40B37F534232BB7DF7AC9D8CEA28E419884C44382FE4F9D60A8AB2D4F92A60381E8A3E1EB2C3806C44E622A4F7A659DE751B7826F655B5BE5EBB775A906E0E4B39870889FB715207C7EFE0F94B672CFC9DD9D8A47E5A7E96B2328D55D7725DA6CAA1B2605A0C5AD40CA9B7D884C8C5F9F8A1341043E4BA86006B2337FF45CE736FA0F97305D95444BF0BEA78887658B856DF58BAC631807F70E0F6E5B607FE8A10092B6FAA54FB1696FAAAC7CC2777256A8432C04F50345B5FFCF434547149AE457620555C8D70F00BA226A7855DDF1A54249B89562A1725B61FAD4DB95CFFE4291A0A290E9D43FCDC17A98F1236B23837F09BEE7DF967DE8648C1C634B7EC05B7AEF2C457E9AC6E12625")
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
