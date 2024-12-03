//@discordjs/rest is a module that allows you to easily make REST requests to the Discord API.
module.exports = {
    name: 'ready',
    once: true,
    async execute(interaction, client) {
        if (interaction.isChatInputCommand()) {
            const { commands } = client;
            const { commandName } = interaction;
            const command = commands.get(commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                console.error(error);
                await interaction.reply({
                    content: `Something went wrong during the execution of ${commandName}`,
                    ephemeral: true
                })
            }
        }
    }
}