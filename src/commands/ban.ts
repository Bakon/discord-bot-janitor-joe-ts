import * as Discord from 'discord.js';
import { IBotCommand } from '../api';

export default class ban implements IBotCommand {
  private readonly _command = 'ban'

  help(): string {
    return 'Bans the mentioned user';
  }

  isCommand(command: string): boolean {
    return command === this._command;
  }

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    let mentionedUser = msgObject.mentions.users.first();
    let suppliedReason = args.slice(1).join(' ') || `${msgObject.author.username} did not supply reason.`;
    let banLog = `${msgObject.author.username}: ${suppliedReason}`;

    msgObject.delete(0);

    if (!msgObject.member.hasPermission('ADMINISTRATOR')) {
      msgObject.channel.send(`Sorry ${msgObject.author.username}, but you don't have permission to do this!`);
      return;
    }

    if (!mentionedUser) {
      msgObject.channel.send(`Sorry ${msgObject.author.username}, I couldn't find that user!`);
      return;
    }

    msgObject.guild.member(mentionedUser).ban(banLog)
      .then(console.log)
      .catch(console.error)
  }
};