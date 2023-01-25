const { Client, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SlashCommandBuilder, CommandInteraction, inlineCode, bold } = require('discord.js');
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

        const Collector = interaction.channel.createMessageComponentCollector()

        Collector.on('collect', async i => {
          if (i.customId == 'verify')
          {
            const VerifyEmbed = new EmbedBuilder()
            VerifyEmbed.setAuthor({name: `@${info.displayName} (${info.username})`, iconURL: AuthorIcon[0].imageUrl, url: `https://roblox.com/users/${id}/profile`})
            VerifyEmbed.setDescription(`Great to meet you @${info.displayName} (${info.username})! It looks like you haven't verified with us before, in order to prove you actually own this account please copy and paste the following string of emojis in your Roblox description, then press the button below!`)
            VerifyEmbed.setImage("https://media.discordapp.net/ephemeral-attachments/1066465788376121364/1067651067875176448/example.jpg")
            VerifyEmbed.setColor('f8c6d9')
            VerifyEmbed.addFields(
              {name: "Pending Verification:", value: `${interaction.member}`},
              {name: "Verification Code: ", value: `${inlineCode(VerificationCode)}`}
            )

            const Row = new ActionRowBuilder()
             Row.addComponents(
            new ButtonBuilder()
            .setCustomId('done')
            .setEmoji('1067646976616828948')
           .setLabel('Finished!')
           .setStyle(ButtonStyle.Primary),
            )

              interaction.editReply({embeds: [VerifyEmbed], components: [Row], content: `📱 | Mobile copy and paste ${inlineCode(VerificationCode)} `})
              return
          }
          else if (i.customId == 'noverify')
          {
            const DeclineEmbed = new EmbedBuilder()
            DeclineEmbed.setAuthor({name: `@${info.displayName} (${info.username})`, iconURL: AuthorIcon[0].imageUrl, url: `https://roblox.com/users/${id}/profile`})
            DeclineEmbed.setDescription('Verification promp cancelled.')
            DeclineEmbed.setColor('ff0000')

            const Row = new ActionRowBuilder()
        Row.addComponents(
        new ButtonBuilder()
        .setCustomId('Fverify')
        .setEmoji('1066472444560429117')
        .setLabel('This is me!')
        .setDisabled(true)
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setCustomId('Fnoverify')
        .setEmoji('1066472514672406669')
        .setLabel(`This isn't me!`)
        .setDisabled(true)
        .setStyle(ButtonStyle.Danger),
        )
        interaction.editReply({embeds: [DeclineEmbed], components: [Row], content: '\u200B'})
        return
          }
          else if (i.customId == "done")
          {
            const NewInfo = await noblox.getPlayerInfo(id)
            if (NewInfo.blurb == VerificationCode)
            {
              const Role = interaction.guild.roles.cache.find(r => r.name == "Customer")
              const DoneEmbed = new EmbedBuilder()
              DoneEmbed.setAuthor({name: `@${info.displayName} (${info.username})`, iconURL: AuthorIcon[0].imageUrl, url: `https://roblox.com/users/${id}/profile`})
              DoneEmbed.setColor('f8c6d9')
              DoneEmbed.setDescription(`Congrats! You have verified yourself as @${info.displayName} (${info.username}) in ${bold(interaction.guild.name)}. Please wait a couple seconds to recieve your role(s)`)

              interaction.editReply({embeds: [DoneEmbed], content: '\u200B', components: [new ActionRowBuilder()]})

              try
              {
                interaction.member.setNickname(`${info.displayName} (${info.username})`, 'Verification')
                interaction.member.roles.add(Role)
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
        })
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