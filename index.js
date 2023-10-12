require("dotenv").config()

const { REST, Routes, Collection } = require("discord.js");
const { Client, GatewayIntentBits } = require("discord.js");

const { readdirSync } = require("fs");

const Bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
  ],
});

Bot.login(process.env.Token);

Bot.commands = new Map();
const slashCommands = [];

const rest = new REST({ version: "10" }).setToken("MTA2NDczOTA1NzA2Nzg5MjczNg.GWEuzD.4A-TZj2PftQc5ZAMmoIaM3lQJDmivWaegxyO1M");

const commands = readdirSync("./commands").filter((File) =>
  File.endsWith(".js")
);

const events = readdirSync("./Events").filter((File) =>
File.endsWith(".js")
);

for (const command of commands) {
  const file = require(`./commands/${command}`);
  Bot.commands.set(file.name.toLowerCase(), file);

  if (file.data) {
    slashCommands.push(file.data);
  }
}

for (const event of events) {
  const file = require(`./Events/${event}`);
  const name = event.split(".")[0];

  Bot.on(name, file.execute.bind(null, Bot));
}

const BotID = "1064739057067892736";
const ServerID = "1059654500878655599";
rest.put(Routes.applicationGuildCommands(BotID, ServerID), {body: slashCommands});
