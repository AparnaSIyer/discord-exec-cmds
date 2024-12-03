const fs = require('fs');

module.exports = (client) => {
    client.handleEvents = async () => {
        const folders = fs.readdirSync("./src/dscd-events");

        for (const folder of folders) {
            const files = fs.readdirSync(`./src/dscd-events/${folder}`).filter(file => file.endsWith('.js'));
         
            switch (folder) {
                case "dscd-client":
                    for (const file of files){
                        const event = require(`../../dscd-events/${folder}/${file}`);
                        if(event.once) client.once(event.name,(...args)=> event.execute(...args,client))
                        else client.on(event.name, (...args)=> event.execute(...args, client))
                    }
                    break;
            
                default:
                    break;
            }
        }
    }
}