import * as Discord from 'discord.js';
import {IBotCommand} from '../api';

export default class purge implements IBotCommand {
    private readonly _command = 'purge';

    help(): string {
        return 'Admin only | Deletes the requested amount of messages';
    }

    isCommand(command: string): boolean {
        return command === this._command;
    }

    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        msgObject.delete();

        if (!msgObject.member.hasPermission('ADMINISTRATOR')) {
            msgObject.channel
                .send(`Sorry ${msgObject.author.username} but you don't have permission to do that!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                });
            return;
        }

        let messagesToDelete = Number(args[0]);

        if (!args[0]) {
            msgObject.channel
                .send(`Sorry ${msgObject.author.username}, you didn't tell me how many messages to delete!`)
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                });
            return;
        }

        if (isNaN(messagesToDelete) || messagesToDelete > 100) {
            msgObject.channel
                .send(
                    `Sorry ${msgObject.author.username}, but that's not a valid number! Please enter a number between 1-100`
                )
                .then(msg => {
                    (msg as Discord.Message).delete(5000);
                });
            return;
        }

        messagesToDelete = Math.round(messagesToDelete);

        msgObject.channel.bulkDelete(messagesToDelete).catch(console.error);
    }
}
