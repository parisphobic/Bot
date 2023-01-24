const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, CommandInteraction } = require('discord.js');
const { setTimeout } = require('node:timers/promises');
const wait = require('node:timers/promises').setTimeout;
const noblox = require('noblox.js')


module.exports = {
    name: 'verify',
    description: "A command for verifying your account",
    cooldown: 3000,
    data : new SlashCommandBuilder() 
   .setName('verify')
   .setDescription('A command for verifying your account')
   .addStringOption(option => option.setName('username').setDescription('Your username').setRequired(true)),

   /**
    * 
    * @param {Client} Bot 
    * @param {CommandInteraction} interaction 
    */

   async slashExecute(Bot, interaction) {
    const user = interaction.options.get('username')
    try{
        const getRandomEmoji = () => {
            const emojis = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋']
            return emojis[~~(Math.random() * emojis.length)]
         }          
        const VerificationCode = getRandomEmoji() + getRandomEmoji() + getRandomEmoji() + getRandomEmoji() + getRandomEmoji() + getRandomEmoji() + getRandomEmoji()
        const id = await noblox.getIdFromUsername(user.value)
        const info = await noblox.getPlayerInfo(id)
        const AuthorIcon = await noblox.getPlayerThumbnail([id], '720x720', 'png', true, 'headshot')
        const Embed = new EmbedBuilder()
        Embed.setAuthor({name: `@${info.displayName} (${info.username})`, iconURL: AuthorIcon[0].imageUrl, url: `https://roblox.com/users/${id}/profile`})
        Embed.setDescription(`Hello ${interaction.member} and welcome to ${interaction.guild.name}. I see that you are trying to verify with the roblox account [@${info.displayName} (${info.username})](https://roblox.com/users/${id}/profile). Before we continue with the verification process please verify that you own this account below!`)
        Embed.setThumbnail(AuthorIcon[0].imageUrl)
        Embed.setColor('f8c6d9')

        const Row = new ActionRowBuilder()
        Row.addComponents(
        new ButtonBuilder()
        .setCustomId('verify')
        .setEmoji('1066472444560429117')
        .setLabel('This is me!')
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setCustomId('noverify')
        .setEmoji('1066472514672406669')
        .setLabel(`This isn't me!`)
        .setStyle(ButtonStyle.Danger),
        )
        
        interaction.reply({embeds: [Embed], components: [Row]})
    }    
   catch (err)
   {
    console.log(err)
      const ErrEmbed = new EmbedBuilder()
      ErrEmbed.setAuthor({name: interaction.user.tag, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
      ErrEmbed.setColor('ff0000')
      ErrEmbed.setTitle('ERROR!')
      ErrEmbed.setDescription(`Error: ${err.message} | please report this to our bot developer <@937825212769120346> as soon as possible.`)
      ErrEmbed.setTimestamp()
      interaction.reply({embeds: [ErrEmbed], ephemeral: true})
        }
   }
}