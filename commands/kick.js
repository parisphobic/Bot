const {
  Client,
  Message,
  CommandInteraction,
  EmbedBuilder,
  PermissionsBitField,
} = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

const { promisify } = require("util");

module.exports = {
  name: "Kick",
  cooldown: 5000,
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick person of your choice")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("The person you want to kick")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("reason").setDescription("Reasoning for kick.")
    ),
  /**
   *
   * @param {Client} Bot
   * @param {CommandInteraction} interaction
   */

  async slashExecute(Bot, interaction) {
    try {
      const KickUser = interaction.options.getUser("target");
      const KickMember = await interaction.guild.members.fetch(KickUser.id);

      if (
        !interaction.member.permissions.has(
          PermissionsBitField.Flags.KickMembers
        )
      )
        return await interaction.reply({
          content: "You do not have permissions to ``Kick``.",
          ephemeral: true,
        });
      if (!KickMember)
        return await interaction.reply({
          content: "The person you mentioned is no longer in the server",
          ephemeral: true,
        });
      if (!KickMember.kickable)
        return await interaction.reply({
          content:
            "You do not have permissions to ``Kick`` this person because they are either the same rank as you/me, or they are above you/me.",
          ephemeral: true,
        });

      let Reason = interaction.options.get("reason");
      if (Reason) {
        Reason = Reason.value;
      } else {
        Reason = "No reason provided";
      }

      const DmEmbed = new EmbedBuilder();
      DmEmbed.setTitle("You've been kicked from FroyoTopia!");
      DmEmbed.setDescription(
        `:white_check_mark: | You have been kicked from ${interaction.guild.name} \n Reasoning: ${Reason} `
      );
      DmEmbed.setAuthor({
        name: KickUser.tag,
        iconURL: KickUser.displayAvatarURL({ dynamic: true }),
      });
      DmEmbed.setColor("2f3136");
      DmEmbed.setThumbnail(interaction.guild.iconURL());
      DmEmbed.setTimestamp();

      await KickMember.send({ embeds: [DmEmbed] }).catch((err) => {
        return;
      });

      const KickEmbed = new EmbedBuilder();
      KickEmbed.setTitle(
        `${KickUser.tag} has been kicked from ${interaction.guild.name}`
      );
      KickEmbed.setDescription(
        `:white_check_mark: | <@${KickUser.id}> has been kicked from ${interaction.guild.name} \n Reasoning: ${Reason} `
      );
      KickEmbed.setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
      KickEmbed.setColor("2f3136");
      KickEmbed.setThumbnail(interaction.guild.iconURL());
      KickEmbed.setTimestamp();

      await KickMember.kick(Reason).catch((err) => {
        interaction.editReply({
          content: `Error: ${err.message} please report this to our bot developer <@937825212769120346> as soon as possible.`,
          ephemeral: true,
        });
      });

      await interaction.reply({ embeds: [KickEmbed] });
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
