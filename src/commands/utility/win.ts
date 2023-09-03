import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from 'discord.js';

export default new Command({
    interaction: interactions.win,
    execute: async ({ interaction }) => {
      const winModal = new ModalBuilder()
        .setTitle('Share your win!')
        .setCustomId('personalWin')
        .addComponents([
          new ActionRowBuilder<TextInputBuilder>()
            .addComponents([
              new TextInputBuilder()
                .setCustomId('win')
                .setLabel('Your Personal Win')
                .setPlaceholder('What was your win?')
                .setMaxLength(2000)
                .setStyle(TextInputStyle.Paragraph)
                .setRequired(true)
            ])
        ]);

        await interaction.showModal(winModal);
    }
})