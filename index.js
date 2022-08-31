// Require the necessary discord.js classes
const fs = require('node:fs');
const path = require('node:path');
const { Client, GatewayIntentBits, Collection} = require('discord.js');
const {token} = require('./config.json');

//Create Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]});
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFile = fs.redirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.name, command);
}



//When client is ready run this code once.
client.once('ready', () => {console.log('ready');});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return; 
    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({content: 'There was an error executing the command'})
    }

});







client.login(token);
