import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { getItem } from '../../functions/helpers/getItem';
import { forceUser } from '../../schemas/user';
import { logger } from '../../logger';

export default new Command({
    interaction: interactions.buy,
    execute: async ({ client, interaction, options }) => {
      const name = options.getString('item');
      const item = await getItem(name);
      if (!item) {
        return await interaction.reply({ embeds: [client.embeds.attention('Don\'t know what you\'re looking for, but this item does not exist.')], ephemeral: true })
      }
      if (!item.buyable) {
        return await interaction.reply({ embeds: [client.embeds.attention(`${item.name} is not a buyable item.`)], ephemeral: true });
      };

      const user = await forceUser(interaction.user.id);
      try {
        if (!user.nibs || user.nibs < item.price) {
          return await interaction.reply({ embeds: [client.embeds.attention('You don\'t have enough money in your wallet to purchase this item.')], ephemeral: true });
        } else {
          const itemIndex = user.inventory.findIndex((i) => i.id == name.toLowerCase().replaceAll(/\s+/g, ""));
          if (itemIndex == -1) {
            user.inventory.push({
              id: item.id,
              amount: 1
            });
          } else {
            const inventoryItem = user.inventory[itemIndex];
            inventoryItem.amount++;
            user.inventory[itemIndex] = inventoryItem;
          };
  
          user.nibs -= item.price;
          await user.save().catch((err) => { logger.error(err) });
  
          return await interaction.reply({ embeds: [client.embeds.success(`You have bought a ${item.name.replaceAll(/:.*?:/g, "")
            .replace(/(?:\u00A9\s|\u00AE\s|[\u2000-\u3300]\s|\uD83C[\uD000-\uDFFF]\s|\uD83D[\uD000-\uDFFF]\s|\uD83E[\uD000-\uDFFF])(?<ws>\s)?/, "")} for ${client.emoji.nibs}${item.price} Nibs!`)] })
        }
      } catch (error) {
        return await interaction.reply({ embeds: [client.embeds.error('An error occured while attempting to purchase this item.')], ephemeral: true })
      }
    }
})