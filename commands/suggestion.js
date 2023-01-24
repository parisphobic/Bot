const {
  Client,
  Message,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  SlashCommandBuilder,
  CommandInteraction,
  Options,
  Collection,
} = require("discord.js");
const { setTimeout } = require("node:timers/promises");
const wait = require("node:timers/promises").setTimeout;

module.exports = {
  name: "suggestion",
  description:
    "A command for suggesting things to do around the server and/or game",
  cooldown: 10000,
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription(
      "A command for suggesting things to do around the server and/or game"
    )
    .addStringOption((option) =>
      option
        .setName("suggestion")
        .setDescription("What do you want to suggest?")
        .setRequired(true)
    )
    .addAttachmentOption((option) =>
      option
        .setName("image")
        .setDescription("An example of what you are suggesting. (Not required)")
    ),

  /**
   *
   * @param {Client} Bot
   * @param {CommandInteraction} interaction
   */

  async slashExecute(Bot, interaction) {
    try {
      const embed = new EmbedBuilder();
      embed.setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
      embed.setColor(`f8c6d9`);
      embed.setDescription(` ${interaction.options.get("suggestion").value}`);
      embed.setTimestamp();

      let image = interaction.options.get("image");
      if (image) {
        embed.setImage(image.attachment.proxyURL);
      }

      const channel = Bot.channels.cache.get("1066215395624755220");
      channel.send({ embeds: [embed] }).then((msg) => {
        msg.react("1066472444560429117");
        msg.react("1066472514672406669");
      });

      interaction.reply({
        content:
          "Thank you for submitting a suggestion! We'll be looking into it soon! You can find your suggestion at <#1066215395624755220>",
        ephemeral: true,
      });
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
