
const { Client, Events, GatewayIntentBits } = require("discord.js");
const config = require("./config.json");

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const prefix = "!";

try {
    client.on("messageCreate", function (message) {
        // line checks if the author of the message is a bot, and if so, stops processing the command
        if (message.author.bot) return;
        if (!message.content.startsWith(prefix)) return;

        const commandBody = message.content.slice(prefix.length);
        const args = commandBody.split(' ');
        const command = args.shift().toLowerCase();

        if (command === "ping") {
            const timeElapsed = Date.now() - message.createdTimestamp;
            message.reply(`Pong! This message executed and completed within ${timeElapsed}ms`);
        } else if (command === "sum") {
            const numericalArgs = args.map(arg => parseFloat(arg));
            const sum = numericalArgs.reduce((result,arg) => result += arg);
            message.reply(`Your sums is ${sum}`);
        }

    });
} catch (error) {
    console.log(error, "error");

}

client.login(config.BOT_TOKEN);