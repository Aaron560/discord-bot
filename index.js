// Require the necessary discord.js classes
const { Client, GatewayIntentBits} = require('discord.js');
const {token} = require('./config.json');

//Create Client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds]});

//When client is ready run this code once.
client.once('ready', () => {console.log('ready');});

client.login(token);

