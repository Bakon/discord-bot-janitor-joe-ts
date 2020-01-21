import * as Discord from 'discord.js';
import {IBotCommand} from '../api';

export default class help implements IBotCommand {
    private readonly _command = 'help';

    help(): string {
        return 'Returns a list';
    }

    isCommand(command: string): boolean {
        return command === this._command;
    }

    runCommand(args: string[], msgObject: Discord.Message, client: Discord.Client): void {
        msgObject.channel.send();
    }
}
