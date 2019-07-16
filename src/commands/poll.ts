import * as Discord from 'discord.js';
import { IBotCommand } from '../api';
import { state } from '../state';

export default class poll implements IBotCommand {
  private readonly _command = 'poll'

  help(): string {
    return 'poll';
  }

  isCommand(command: string): boolean {
    return command === this._command;
  }

  runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
    const embed = new Discord.RichEmbed();
    const userMessage = msgObject.author.lastMessage.content;

    embed.addField(`${userMessage}`, 'Yes', true);
    embed.addField('Should you play another one?', 'Yes');
    
    msgObject.channel.send(embed)
      .then(msg => {
        const filter = (reaction: {emoji: {}}): boolean => true;
        const collector = msgObject.createReactionCollector(filter, { time: 10000 });
    
        collector.on('collect', res => console.log(`Collected ${res.emoji.name}`));
        collector.on('end', collected => console.log(`Collected ${collected.size} items`));    
      })
  }
};