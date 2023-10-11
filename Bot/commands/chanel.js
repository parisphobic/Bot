const { Client , Message, EmbedBuilder} = require('discord.js')

module.exports = {
    name: 'Chanel',
    description: "CHANEL THE FLOP",

    /**
     * 
     * @param {Client} Bot 
     * @param {Message} message 
     * @param {*} args 
     */

   async execute(Bot, message, args) {
       const embed = new EmbedBuilder()

       embed.setTitle('CHANEL THE BIGGIE')
       embed.setDescription('Chanel the big fat hippo does not know how to manage a roblox group and tries to SCAM hardworking people... Where my 9k robux at chanel?')
       embed.setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
       embed.setColor('2f3136')
       embed.setImage('https://cdn.discordapp.com/attachments/1039642210251051118/1064998621445095556/IMG_3186.png')

       message.reply({embeds : [embed]})
   }
}