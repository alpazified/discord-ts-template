import { ApplicationCommandOptionType } from "discord.js";
import { interactionOptions } from "../../typings";

export const shopCommand = {
    name: 'shop',
    description: 'View all items currently available in the shop!',
    directory: 'utility',
    permission: 'SendMessages',
    botPermission: ['SendMessages'],
    options: [
        {
            name: 'ephemeral',
            description: 'Change the visibility of the message.',
            type: ApplicationCommandOptionType.Boolean,
            required: false
        }
    ]
} as interactionOptions;