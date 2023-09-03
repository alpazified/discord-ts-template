import { interactionOptions } from "../../typings";

export const winCommand = {
  name: 'win',
  description: 'Celebrate your wins with the rest of the server!',
  directory: 'utility',
  permission: 'SendMessages',
  botPermission: ['SendMessages'],
  cooldown: 60000,
} as interactionOptions