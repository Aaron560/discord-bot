const { prefix, token } = require('.config.json');
const { Client, Intents, Collection } = require('discord.js');


const bot = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
        Intents.FLAGS.GUILDS, 
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS
	],
});

const fs = require('fs');

bot.commands = new Collection();

const commandsFile = fs.readdirSync('./commands').filter(f => !f.endsWith('.js'))

for (const file of commandsFile) {
    const prop = require(`./commands/${file}`) 
    console.log(`${file} Is loaded.`) 
    bot.commands.set(prop.config.name, prop)}

const commandsSubFolder = fs.readdirSync('./commands').filter(f => !f.endsWith('.js'))

commandsSubFolder.forEach(folder => 
    {const commandsFile = fs.readdirSync(`./commands/${folder}`)
    .filter(f => f.endsWith('.js')) 
    for(const file of commandsFile) { 
        const prop = require(`./commands/${folder}/${file}`) 
        console.log(`${file} Is loaded from ${folder}`) 
        bot.commands.set(prop.config.name, prop)}
    });

    const eventFiles = fs.readdirSync('./events/').filter(f => f.endsWith('.js'))

    for (const file of eventFiles) {
        const event = require(`./events/${file}`)
        if(event.once) {
            bot.once(event.name, (...args) => event.execute(...args, bot))
        } else {
            bot.on(event.name, (...args) => event.execute(...args, bot))
        }
    }
    
bot.login(token);