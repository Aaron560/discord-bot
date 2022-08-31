const {SlashCommandBuilder, Routes} = require('discord.js')
const {REST} = require('@discordjs/rest')
const {clientId, guildId, token} = require('./config.json')

const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies with user info!'),

]
    .map(command => command.toJson());

const rest = new Rest({version: '1.0'}).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), {body: commands})
    .then((data) => console.log('Successfully Registered ${data.length} application commands.'))
    .catch(console.error);