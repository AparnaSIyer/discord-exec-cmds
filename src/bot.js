
const { Client, Events, GatewayIntentBits, Collection } = require("discord.js");
require('dotenv').config();
const {BOT_TOKEN} = process.env;
const fs = require('fs');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
client.once(Events.ClientReady, readyClient => {
    // console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});


// It extends JavaScript's native Map class, so it has all the Map features and more!
client.commands = new Collection();
const dscdFunctionFolders = fs.readdirSync(`./src/dscd-functions`);

// readdirSync: The fs.readdirSync() method is used to synchronously read the contents of a given directory. The method //returns an array with all the file names or objects in the directory. 

for (const folder of dscdFunctionFolders) {
    const functionFiles = fs.readdirSync(`./src/dscd-functions/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of functionFiles) 
        require(`./dscd-functions/${folder}/${file}`)(client);
    
}

const prefix = "!";


try {
    client.on("messageCreate", async function (message) {
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
            const sum = numericalArgs.reduce((result, arg) => result += arg);
            message.reply(`Your sums is ${sum}`);
        } else if (command === "inspire") {
            const response = await fetchQuotes();

        }

    });
} catch (error) {
    console.log(error, "error");

}

async function fetchQuotes() {
    const res = await fetch('https://dummyjson.com/quotes/random');
    return res.json();
}

client.handleEvents();
client.handleCommands();
client.login(BOT_TOKEN);