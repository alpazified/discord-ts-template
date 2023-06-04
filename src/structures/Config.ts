import { WebhookClient } from 'discord.js';

export class Config {
	/** Logging system status */
	public logging = {
		webhook: null as WebhookClient,
	};

	/** General data */
	public general = {
		developers: [] as string[],

	};

	public async updateAll() {
		this.general = {
			developers: [],

		}
		this.logging = {
			webhook: new WebhookClient({ url: '' }),
		};
	};
};