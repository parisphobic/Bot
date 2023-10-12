const { Client, ActivityType, Status } = require("discord.js");
const noblox = require("noblox.js");

/**
 *
 * @param {Client} Bot
 */

module.exports.execute = async (Bot) => {
  Bot.login(process.env.Token);
  console.log(`${Bot.user.tag} has logged in`);
  Bot.user.setActivity("FroyoTopia", { type: ActivityType.Watching });
  Bot.user.setStatus(Status.Idle);
  const Rbx = await noblox.setCookie(process.env.Cookie)
  try {
    console.log(`${Rbx.UserName}`)
    console.log("Started refreshing application (/) commands.");
    const channel = Bot.channels.cache.get("1065816008436228196");
    channel.send("Bot is online - Visual Studio Code");
    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
    const channel = Bot.channels.cache.get("1065816008436228196");
    channel.send("Bot error. \n " + error);
  }
};
