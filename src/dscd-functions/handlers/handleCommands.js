const fs = require('fs');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types');

module.exports = (client) => {
    client.handleCommands = async () => {
        const commandFolders = fs.readdirSync("./src/dscd-commands");

        for (const folder of commandFolders) {
            const commandFiles = fs.readdirSync(`./src/dscd-commands/${folder}`).filter(file => file.endsWith('.js'));
            const { commands, commandArray } = client;

            for (const file of commandFiles) {
                const command = require(`../../dscd-commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
            }
        }

        const dscdClientID = '1308753605351833630';
        const dscdServerID = '1308758798013300746';

        const rest = new REST({ version: '9' }).setToken(process.env.BOT_TOKEN);

        try {
            
        } catch (error) {
            console.error(error);
        }
    }
}