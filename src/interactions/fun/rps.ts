import { ApplicationCommandOptionType } from "discord.js";
import { interactionOptions } from "../../typings";

export const rpsCommand = {
  name: 'rps',
  description: 'Play a game of rock paper scissors against another person!',
  directory: 'fun',
  cooldown: 15000,
  permission: 'SendMessages',
  botPermission: ['SendMessages'],
  options: [
    {
      name: 'member',
      description: 'Choose a member to play against.',
      type: ApplicationCommandOptionType.User,
      required: true
    },
    {
      name: 'wager',
      description: 'Wager Nibs against the member you\'re playing.',
      type: ApplicationCommandOptionType.Number,
      required: false
    }
  ]
} as interactionOptions;