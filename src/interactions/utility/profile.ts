import { interactionOptions } from "../../typings";
import { ApplicationCommandOptionType } from 'discord.js';

export const profileCommand = {
    name: 'profile',
    description: 'Take a look at a user\'s profile. (Defaults to self)',
    directory: 'utility',
    botPermission: ['SendMessages'],
    options: [
        {
            name: 'user',
            description: 'The user who you want to view.',
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
} as interactionOptions;