module.exports = {
	config: {
		name: 'ping',
		description: 'Gets the bots Ping.',
		usage: '.ping',
	},
	async run(bot,messages, args) {
		message.channel.send("My ping is\`" + bot.ws.ping + " ms\`");
	}
};
