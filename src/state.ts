import * as Discord from 'discord.js';

interface PollState {
    polls: {
        [userId: number]: {
            [channelId: number]: {
                question: string;
                options: string[];
                answers: {
                    [userId: number]: string;
                };
            };
        };
    };
}

export const state: PollState = {
    polls: {}
};
