import { ApplicationCommandOptionType } from "discord.js";
import { interactionOptions } from "../../typings";

export const buyCommand = {
  name: 'buy',
  description: 'Buy an item available in the market.',
  directory: 'utility',
  permission: 'SendMessages',
  botPermission: ['SendMessages'],
  cooldown: 5000,
  options: [
    {
      name: 'item',
      description: 'The item that you want to buy.',
      type: ApplicationCommandOptionType.String,
      choices: [
        { name: 'Fishing Rod', value: 'fishingrod' }
      ],
      required: true
    }
  ]
} as interactionOptions;