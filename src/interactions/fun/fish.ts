import { interactionOptions } from "../../typings";

export const fishCommand = {
  name: 'fish',
  description: 'Cast your rod to get some Nibs and other cool collectibles!',
  directory: 'fun',
  botPermission: ['SendMessages'],
  cooldown: 25000
} as interactionOptions;