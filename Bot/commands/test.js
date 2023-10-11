const { Client , Message} = require('discord.js')
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
    name: 'Test',
    description: "A command for testing",
    data : new SlashCommandBuilder() 
   .setName('test')
   .setDescription('Test'),

    /**
     * 
     * @param {Client} Bot 
     * @param {Message} message 
     * @param {*} args 
     */

   async execute(Bot, message, args) {
        message.reply("test")
   }
}