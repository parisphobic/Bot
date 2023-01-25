const { Client, Interaction, Collection } = require('discord.js')
const fs = require('fs')

/**
 * 
 * @param {Client} Bot 
 * @param {Interaction} interaction
 */


module.exports.execute = (Bot, interaction) => {
    if (!interaction.isCommand()) return
    const Command = interaction.commandName
    if (!Bot.commands.has(Command)) return
    
    if (!Bot.cooldowns.has(Command.name)){ 
        Bot.cooldowns.set(Command.name, new Collection())
    }
        const now = Date.now();
        const timestamps = Bot.cooldowns.get(Command.name);
        const cooldownAmount = Bot.commands.get(Command).cooldown;
        if (timestamps.has(interaction.user.id)) {
            const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;
                return interaction.reply({content: `Please wait ${timeLeft.toFixed(1)} seconds to use this command!`, ephemeral: true});
            }
        }
    
    timestamps.set(interaction.user.id, now);
    Bot.commands.get(Command).slashExecute(Bot, interaction)
    setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);
}