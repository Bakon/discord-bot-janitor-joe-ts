import * as Discord from 'discord.js';
import { IBotCommand } from '../api';


export default class coinflip implements IBotCommand {
  private readonly _command = 'coinflip'

  help(): string {
    return 'Does a coinflip so you know the outcome of a game';
  }

  isCommand(command: string): boolean {
    return command === this._command;
  }

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    let random = (Math.floor(Math.random() * 2) == 0)
      ? 'has blessed you, you will win next game'
      : 'didn\'t bless you, you will lose this game';
    msgObject.channel.send(random);
  } 
};