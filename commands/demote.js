const {
  Client,
  Message,
  CommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const roblox = require('noblox.js')
roblox.setCookie("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_7D9B72DFDD6F38DF85631738A1D4F7FDFC8B8A4DB613AF667AE10A61E0B3451CA51F64DBA751E0DE9DFA97CE73FE2531CE1FD1CB735AFCD7C04174DC8D156A07BE0B77ED48E263A80587492635CAD0DD741C9F330EBA962671F94A5A9D23AF40758FBC8D6F5C96609E765A0E2B97775E09F3C3866DBB5423E53A6CCBA6A9A9E4019A15571BE6146BFC456DC72DF1A93E8C2E586F3C127EF7D34A5BA2E4F42306D7103F03FA821903DA9417B1E009BBEF00712F0E5284328E236630540CA5893EC8E3172DD861C6C8D4A6B9C00A5F50A3AB1193469563233AED23EA79F2977854EA1985B38DD8EA72A78469AB26B4644BD5B744D887CAB77B9794200C4FE5391A8F1E1703F2CB750EBA565919374ECE8062C49305D4B0B399B5B3A0059C5BA8E2617DE21E269DCBD91712755AD209F7C90DF4BC3937BB3AF7A98ED5E8B5BCDBC0B1CED4316A4D7E7BEBF6C5AF435BB2253AEF910614F825649420DAB4F80FF7E52B77DE2AB931FCE10237E06177B4D97A9C03A04245374424BB1744EE3695514264EFAD30")
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
