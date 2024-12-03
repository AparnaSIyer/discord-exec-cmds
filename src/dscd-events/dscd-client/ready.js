module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`Ready! Steady! Po!!!! ${client.user.tag} is on the floor and ready to roll!`);
    }
}