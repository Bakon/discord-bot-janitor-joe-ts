import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import fetch from 'node-fetch';

export default class tifu implements IBotCommand {
  private readonly _command = 'tifu'

  help(): string {
    return 'Returns a random "today I fucked up" post from Reddit';
  }

  isCommand(command: string): boolean {
    return command === this._command;
  }

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    fetch('https://www.reddit.com/r/tifu/new.json?sort=new')
      .then(res => res.json())
      .then(json => console.log(JSON.stringify(json.data.children)));

  }
};