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
  const Rbx = await noblox.setCookie('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_7D9B72DFDD6F38DF85631738A1D4F7FDFC8B8A4DB613AF667AE10A61E0B3451CA51F64DBA751E0DE9DFA97CE73FE2531CE1FD1CB735AFCD7C04174DC8D156A07BE0B77ED48E263A80587492635CAD0DD741C9F330EBA962671F94A5A9D23AF40758FBC8D6F5C96609E765A0E2B97775E09F3C3866DBB5423E53A6CCBA6A9A9E4019A15571BE6146BFC456DC72DF1A93E8C2E586F3C127EF7D34A5BA2E4F42306D7103F03FA821903DA9417B1E009BBEF00712F0E5284328E236630540CA5893EC8E3172DD861C6C8D4A6B9C00A5F50A3AB1193469563233AED23EA79F2977854EA1985B38DD8EA72A78469AB26B4644BD5B744D887CAB77B9794200C4FE5391A8F1E1703F2CB750EBA565919374ECE8062C49305D4B0B399B5B3A0059C5BA8E2617DE21E269DCBD91712755AD209F7C90DF4BC3937BB3AF7A98ED5E8B5BCDBC0B1CED4316A4D7E7BEBF6C5AF435BB2253AEF910614F825649420DAB4F80FF7E52B77DE2AB931FCE10237E06177B4D97A9C03A04245374424BB1744EE3695514264EFAD30')
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
