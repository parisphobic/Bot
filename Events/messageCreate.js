const { Client, Message, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
/**
 * 
 * @param {Client} Bot 
 * @param {Message} message
 */


function generate(number) {
  let gg = [];

  let string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

  string = string.split("");
  for (let k = 0; k < number; k++) {
    gg.push(string[Math.floor(Math.random() * string.length)]);
  }
  return gg.join("");
}

let feedback = new Set()

module.exports.execute = (Bot, message) => {
    let args = message.content;
    if (message.author.bot) return;
  if(message.channel.id = '1066215395624755220') {
      message.delete()
      let i = 0;
      let l = 0;
      let back = generate(5)
      let go = generate(5)
      const embed = new EmbedBuilder()
  .setAuthor({name: message.author.tag, iconURL: message.author.displayAvatarURL()})      
  .setColor(`ff00ff`)
  .setThumbnail(message.author.displayAvatarURL())
  .setDescription(`> ${args}`)
  .setTimestamp()
  let attachm = message.attachments.first()
  if (attachm) {
      embed.setImage(attachm.proxyURL)
  }

  const row = new ActionRowBuilder()
			.addComponents(
				  new ButtonBuilder()
					.setCustomId(`${l}`)
					.setLabel('Agree')
          .setEmoji('1066230169439830057')
          .setCustomId(go)
					.setStyle(ButtonStyle.Success),
          
          new ButtonBuilder()
					.setCustomId(`${i}`)
					.setLabel('Disagree')
          .setEmoji('1066230111730405427')
          .setCustomId(back)
					.setStyle(ButtonStyle.Danger),
			);


  Bot.channels.cache.get(message.channel.id).send({ content: 'Suggestion!', embeds: [embed], components: [row]})
  
    const collector = message.channel.createMessageComponentCollector();

    collector.on('collect', async button => {
	    await button.deferUpdate();
      await wait(1000);
      if (button.customId == go){
        console.log(button.user.tag)
        if (feedback.has(`${button.user.tag}`))
        {
          return;
        }
        else
        {
          l += 1
        }
        
        button.user.send('clicked')
        button.update({ content: 'Suggestion! - Edit', embeds: [embed], components: [row]})
        feedback.add(`${button.user.tag}`)
      }
    }); 
}
}