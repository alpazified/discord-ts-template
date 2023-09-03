import { EmbedBuilder, GuildTextBasedChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { Modal } from "../../structures/Modal";

export default new Modal({
  customId: 'personalWin',
  permission: 'SendMessages',
  execute: async ({ client, interaction, fields }) => {
    const win = fields.getTextInputValue('win');
    const winEmbed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.displayName, iconURL: interaction.user.avatarURL() })
      .setDescription(win)
      .setColor('#2C2D31')
    
    const winRow = new ActionRowBuilder<ButtonBuilder>()
      .addComponents([
        new ButtonBuilder()
          .setCustomId('celebrateWin')
          .setLabel('Celebrate this win!')
          .setEmoji('🎉')
          .setStyle(ButtonStyle.Primary)
      ])
    const winChannel = await interaction.guild.channels.fetch(client.config.general.winChannel) as GuildTextBasedChannel;
    if (!winChannel) {
      return await interaction.reply({ embeds: [client.embeds.error('Posting wins are currently disabled.')], ephemeral: true })
    }
    await winChannel.send({ content: `Celebrate ${interaction.user.toString()}'s win!`, embeds: [winEmbed], components: [winRow], allowedMentions: { users: [interaction.user.id] } });
    return await interaction.reply({ embeds: [{ description: `🎉 | Your win has been posted in ${winChannel.toString()}!`, color: client.colors.invisible }], ephemeral: true })
  }
});