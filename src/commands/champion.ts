import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import { Champions } from '../data/champions';

export default class champion implements IBotCommand {
  private readonly _command = 'champion'

  help(): string {
    return 'Gives a random champion';
  }

  isCommand(command: string): boolean {
    return command === this._command;
  }

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    function randomChampion() {
      let suppliedRole = args.slice(0).join(' ');

       switch (suppliedRole) {
        case 'adc' || 'bot':
          return Champions.adc[Math.floor(Math.random() * Champions.adc.length)];
        break;
        
        case 'support' || 'supp':
          return Champions.support[Math.floor(Math.random() * Champions.support.length)];
        break;

        case 'mid':
          return Champions.mid[Math.floor(Math.random() * Champions.mid.length)];
        break;

        case 'jungle' || 'jgl':
          return Champions.jungle[Math.floor(Math.random() * Champions.jungle.length)];
        break;

        case 'top':
          return Champions.top[Math.floor(Math.random() * Champions.top.length)];
        break;

        default:
          return Champions.any[Math.floor(Math.random() * Champions.any.length)];
      }
    }
    msgObject.channel.send(randomChampion());
  }
};