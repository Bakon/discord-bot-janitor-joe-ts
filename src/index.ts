import * as Discord from 'discord.js';
import * as ConfigFile from '../config';
import glob from 'glob';

import {IBotCommand} from './api';
import {state} from './state';

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

client.on('ready', () => {
    // Let us know that the bot is online
    client.user
        .setActivity('Janitor simulator', {type: 'PLAYING'})
        .then(presence => console.log(`Activity set to ${presence.game ? presence.game.name : 'none'}`))
        .catch(console.error);
});

client.on('message', msg => {
    // Ignores messages sent by the bot itself
    if (msg.author.bot) return;
    // Ignore messages that don't start with the prefix
    if (!msg.content.startsWith(ConfigFile.config.prefix)) return;
    // Handles the loadCommands
    handleCommand(msg);
});

glob.sync(`${__dirname}/commands/*.{t,j}s`).forEach(filePath => {
    const commandsClass = require(filePath).default;

    commands.push(new commandsClass());
});

async function handleCommand(msg: Discord.Message) {
    const command = msg.content.split(' ')[0].replace(ConfigFile.config.prefix, '');
    const args = msg.content.split(' ').slice(1);

    for (const commandClass of commands) {
        // Attempts to execute code but will be ready to catch errors
        try {
            // Check if our command class is correct
            if (!commandClass.isCommand(command)) continue;
            // Pauses execution whilst we run the commands code
            await commandClass.runCommand(args, msg, client);
        } catch (Error) {
            console.log(Error);
        }
    }
}

client.login(ConfigFile.config.token).then(() => console.log('Ready to clean up your mess!'));
