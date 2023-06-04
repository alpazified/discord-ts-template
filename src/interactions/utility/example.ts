import { ApplicationCommandOptionType } from "discord.js";
import { interactionOptions } from "../../typings";


export const exampleCommand = {
	name: 'example',
	description: 'This is an example command',
	directory: 'utility',
	type: 1,
	cooldown: 5000,
	permission: 'ManageGuild',
	options: [
		{
			name: 'exampled',
			description: 'exampled',
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: 'examplified',
			description: 'exmaf',
			type: ApplicationCommandOptionType.Subcommand
		}
	]

} as interactionOptions;