import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { forceUser } from '../../schemas/user';
import { logger } from '../../logger';

export default new Command({
    interaction: interactions.fish,
    execute: async ({ client, interaction }) => {
      const user = await forceUser(interaction.user.id);
      const rod = user?.inventory.find((i) => i.id == 'fishingrod')
      if (!user || !rod) {
        return await interaction.reply({ embeds: [client.embeds.attention(`You need a Fishing Rod ${client.emoji.rod} in order to catch some fish!`)], ephemeral: true });
      };

      const items = ["Shark", "Tuna", "Salmon", "Cod", "Bass", "Trout", "Sardine", "Herring", "Anchovy", "Shoe"];

      const randomItem = Math.floor(Math.random() * 9) + 1;
      const randomAmt = Math.floor(Math.random() * 50) + 30;
    
      const responses = [
        `You went fishing and caught a ${items[randomItem]}! You sold it for ${client.emoji.nibs}${randomAmt} Nibs.`,
        `You went fishing and caught a ${items[randomItem]}! The pawn shop gave you ${client.emoji.nibs}${randomAmt} Nibs for it.`,
        `You went fishing and caught a ${items[randomItem]}! A fisherman gave you ${client.emoji.nibs}${randomAmt} Nibs for it.`,
        `You went fishing and caught a ${items[randomItem]}! A thief stole it but left ${client.emoji.nibs}${randomAmt} Nibs behind.`,
        `You went fishing and caught a ${items[randomItem]}! Your grandma bought it for ${client.emoji.nibs}${randomAmt} Nibs.`,
        `On your way home from fishing, you found a wallet on the ground and it contained ${client.emoji.nibs}${randomAmt} Nibs.`,
        `Your fishing rod magically gave you ${randomAmt} Nibs.`,
      ];
      
      const randomSellResponse = Math.floor(Math.random() * responses.length) ;
      const rodBreak = Math.floor(Math.random() * 49) + 1;
      if (rodBreak === rodBreak) {
        const rodIndex = user.inventory.findIndex((item) => item.id === "fishingrod");
    
        user.netWorth += randomAmt - 150
        user.inventory.splice(rodIndex, 1);
        user.nibs += randomAmt;
        user.netWorth += randomAmt;
        await user.save().catch((error) => logger.error(error));
    
        return interaction.reply({
          content: `You went fishing and caught a ${items[randomItem]}! Unfortunately, your fishing rod broke and you lost it. The pawn shop gave you ${client.emoji.nibs}${randomAmt} Nibs for it.`,
        });
      } else {
        user.nibs += randomAmt;
        user.netWorth += randomAmt;
        await user.save().catch((error) => logger.error(error));

        return await interaction.reply({ content: responses[randomSellResponse] })
      }
    }
})