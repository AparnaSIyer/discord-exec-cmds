const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("OG Ping command"),
    async execute(interation, client) {
        const dscdMsg = await interaction.deferReply({fetchReply:true});

        //client.ws.ping It tells you the time, in milliseconds (ms), it takes for the bot's message to travel to Discord's servers and back. This is sometimes referred to as "round-trip time."
        const newMsg = `Latency in API: ${client.ws.ping}\n Client Ping: ${dscdMsg.createdTimestamp - interaction.createdTimestamp}`;

        await interation.editReply({
            content: newMsg
        });
    }
}