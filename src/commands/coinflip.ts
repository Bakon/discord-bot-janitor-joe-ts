import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

export default class coinflip implements IBotCommand {
  private readonly _command = 'coinflip'

  help(): string {
    return 'Does a coinflip so you know the outcome of a game kappa';
  }

  isCommand(command: string): boolean {
    return command === this._command;
  }

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    function coinFlip() {
      return (Math.floor(Math.random() * 2) == 0)
        ? 'You will win this game'
        : 'You will lose this game';
    }
    
    msgObject.channel.send(coinFlip());
  } 
};