import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

export default class xxxxxx implements IBotCommand {
  private readonly _command = 'xxxxxx'

  help(): string {
    return 'xxxxxx';
  }

  isCommand(command: string): boolean {
    return command === this._command;
  }

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {

    msgObject.channel.send();
  } 
};