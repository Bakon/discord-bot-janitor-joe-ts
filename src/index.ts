import * as Discord from 'discord.js';
import * as ConfigFile from '../config';
import { IBotCommand } from './api';

const client: Discord.Client = new Discord.Client();

let commands: IBotCommand[] = [];

loadCommands(`${__dirname}/commands`)

client.on('ready', () => {
  // Let us know that the bot is online
  console.log('Ready to go!');
});

client.on('message', msg => {
  // Ignores messages sent by the bot itself
  if (msg.author.bot) return;
  // Ignore messages that don't start with the prefix
  if (!msg.content.startsWith(ConfigFile.config.prefix)) return;
  // Handles the loadCommands
  handleCommand(msg);
});

async function handleCommand(msg: Discord.Message) {
  let command = msg.content.split(' ')[0].replace(ConfigFile.config.prefix, '');
  let args = msg.content.split(' ').slice(1);

  for (const commandClass of commands) {
     // Attempts to execute code but will be ready to catch errors
    try {
      // Check if our command class is correct
      if (!commandClass.isCommand(command)) continue;
      // Pauses execution whilst we run the commands code
      await commandClass.runCommand(args, msg, client);
    }
    catch(Error) {
      console.log(Error);
    }
  }
}

function loadCommands(commandsPath: string) {
  // Exit if no commands  
  if (!ConfigFile.config || (ConfigFile.config.commands as string[]).length === 0) return;

  // Loop through all of the commands in config file
  for (const commandName of ConfigFile.config.commands as string[]) {
    const commandsClass = require(`${commandsPath}/${commandName}`).default;
    // Casts as our IBotCommand interface
    const command = new commandsClass() as IBotCommand;

    commands.push(command);
  }
}

client.login(ConfigFile.config.token);