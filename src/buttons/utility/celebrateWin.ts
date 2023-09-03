import { updateUserBalance } from "../../schemas/user";
import { Button } from "../../structures/Button";

export default new Button({
  customId: 'celebrateWin',
  cooldown: 5000,
  execute: async ({ interaction }) => {
    const randomNumber = Math.floor(Math.random() * 31);
    const user = interaction.message.mentions.users.map((u) => { return u });
    if (!user[0]) {
      await interaction.update({ components: [] });
      await interaction.followUp({ embeds: [{ description: '🎉 | Thanks for celebrating this win!', color: 0xae88d5 }], ephemeral: true })
    }
    await interaction.reply({ embeds: [{ description: `🎉 | Thanks for celebrating wins with Designly!`, color: 0xae88d5 }], ephemeral: true });
    await updateUserBalance(user[0].id, randomNumber);

    const chance = Math.floor(Math.random() * 10);
    if (chance == 5) {
      return await updateUserBalance(interaction.user.id, Math.ceil(randomNumber / 3));
    };
    return;
  }
})