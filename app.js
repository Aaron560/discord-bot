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
	]
});

const fs = require('fs');

bot.commands = new Collection();

bot.once("ready", () => {
    bot.user.setStatus("online")
    bot.user.setActivity(".Help" + bot.guilds.size)
    console.log("Online!")
});


bot.on('ready', () => {
    bot.user.setActivity(".help | residing on " + bot.guilds.size + " Servers", { type: 'WATCHING' })
});
    
bot.on("message", message => {
    
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);
    
    if(!command.startsWith(prefix)) return;
    if(command === `${prefix}userinfo`) {
        const embed = new RichEmbed()
        .setAuthor(message.author.username)
        .setColor("#5ED315")
        .setThumbnail( `${message.author.avatarURL}`)
        .addField("Name", `${message.author.username}#${message.author.discriminator}`)
        .addField("ID", message.author.id)

        message.reply("check dms");
        message.channel.send({embed}); 

    }; 


    if("command" === `${prefix}help`) {
        let embed = new RichEmbed()
        embed.addField(".help", "gives you this current information")
        .setTitle("help")
        .setColor("#5ED315")
        .addField(".user", "gives you info about a user(currently being worked on)")
        .addField(".server","gives you info about a server(currently working on it)") 
        .addField("link to support server","https://discord.gg/cRJk74kDvj")
        .addField("invite link for bot","https://discord.com/api/oauth2/authorize?client_id=771489748651868173&permissions=8&scope=bot")
    };
    message.reply("here's a list of commands that i'm able to do")
    message.channel.send({embed});
    messageArray = message.content.split("");
    
    command = messageArray[0];
    if(command === `${prefix}serverinfo`) {
            let embed = new RichEmbed()
            .setAuthor(message.author.username)
            .setColor("#5ED315")
            .addField("Name", `${message.guild.name}`)
            .addField("Owner", `${message.guild.owner.user}`)
            .addField("Server ID" , message.guild.id)
            .addField("User Count", `${message.guild.members.filter(m => m.presence.status !== 'offline').size} / ${message.guild.memberCount}`)
            .addField("Roles", `${message.guild.roles.size}`);
            message.channel.send({embed});
        };
    });
bot.login(token);