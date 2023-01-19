const { Client , Message, EmbedBuilder, CommandInteraction} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

const { promisify } = require('util')
const { wait } = promisify(setTimeout)
 
module.exports = {
    name: 'Chanel',
    description: "CHANEL THE FLOP",
    data : new SlashCommandBuilder() 
    .setName('chanel')
    .setDescription('chanel the big flop'),

   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
    const embed = new EmbedBuilder()

    embed.setTitle('CHANEL THE BIGGIE')
    embed.setDescription('Chanel the big fat hippo does not know how to manage a roblox group and tries to SCAM hardworking people... Where my 9k robux at chanel?')
    embed.setAuthor({ name: interaction.author.name, iconURL: interaction.author.displayAvatarURL() })
    embed.setColor('2f3136')
    embed.setImage('https://cdn.discordapp.com/attachments/1039642210251051118/1064998621445095556/IMG_3186.png')
    interaction.reply({embeds: [embed]})
   }
}