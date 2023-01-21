const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, CommandInteraction, Options } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: 'suggestion',
    description: "A command for suggesting things to do around the server and/or game",
    cooldown: 60,
    data : new SlashCommandBuilder() 
   .setName('suggestion')
   .setDescription('A command for suggesting things to do around the server and/or game')
   .addStringOption(option => option.setName('suggestion').setDescription('What do you want to suggest?').setRequired(true))
   .addAttachmentOption(option => option.setName('image').setDescription('An example of what you are suggesting. (Not required)')),
   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
    const embed = new EmbedBuilder()
    embed.setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic : true})})      
    embed.setColor(`ff00ff`)
    embed.setDescription(` ${interaction.options.get('suggestion').value}`)
    embed.setTimestamp()

    let image = interaction.options.get('image')
    if (image){
        embed.setImage(image.attachment.proxyURL)
    }

    const channel = Bot.channels.cache.get('1066215395624755220')
    channel.send({embeds: [embed]}).then((msg) => {
        msg.react('1066230169439830057')
        msg.react('1066230111730405427')
    });

    interaction.reply({content: "Thank you for submitting a suggestion! We'll be looking into it soon! You can find your suggestion at <#1066215395624755220>", ephemeral: true})
   }
}