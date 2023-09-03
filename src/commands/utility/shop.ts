import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { getShop } from '../../functions/helpers/getShop';
import { EmbedBuilder } from 'discord.js';
import { Item } from '../../interfaces/user';

export default new Command({
    interaction: interactions.shop,
    execute: async ({ client, interaction, options }) => {
        const items = (await getShop()).sort((a, b) => b.price - a.price );
        const store = splitStore(items);
        const embeds: EmbedBuilder[] = [];
        const ephemeral = options.getBoolean('ephemeral');

        store.forEach((s) => {
            let embed = new EmbedBuilder()
                .setTitle('Designly Store')
                // .setAuthor({ name: 'Designly Store', iconURL: interaction.guild.iconURL() })
                .setThumbnail(interaction.guild.iconURL())
                .setColor(client.colors.invisible);

            s.forEach((i) => {
                embed.addFields({ name: `${i.emoji} ${i.name} - ${client.emoji.nibs}${i.price}`, value: i.description, inline: true });
            });
            return embeds.push(embed);
        });


        if (embeds.length == 1) {
            return await interaction.reply({ embeds: [embeds[0]], ephemeral });
        } else {
            console.log(embeds)
        }

    }
})

function splitStore(items: Item[]): Item[][] {
    const batchSize = 25;
    const result: Item[][] = [];
  
    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      result.push(batch);
    }
  
    return result;
  }