import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ComponentType, EmbedBuilder, GuildMember, InteractionCollector } from 'discord.js';

export default new Command({
    interaction: interactions.rps,
    execute: async ({ client, interaction, options }) => {
      const member = options.getMember('member') as GuildMember;
      const wager = options.getNumber('wager');

      if (!member || member?.user?.bot || member?.user.system || interaction.user.id == member.id) {
        return await interaction.reply({ embeds: [client.embeds.error('You cannot play rock paper scissors against this user.')], ephemeral: true });
      };

      const challenger = interaction.user;
      const challenged = member.user;

      if (!challenger || !challenged) {
        return await interaction.reply({ embeds: [client.embeds.error('An unknown error occured while starting the game.')], ephemeral: true });
      };

      const acceptDenyRow = new ActionRowBuilder<ButtonBuilder>()
        .addComponents([
          new ButtonBuilder()
            .setCustomId('accept')
            .setLabel('Accept')
            .setStyle(ButtonStyle.Success)
            .setEmoji('💪'),
          new ButtonBuilder()
            .setCustomId('deny')
            .setLabel('Deny')
            .setStyle(ButtonStyle.Danger)
            .setEmoji('🙅')
        ]);
      const rpsEmbed = new EmbedBuilder()
        .setDescription(`You've been challenged to a game of Rock Paper Scissors by ${challenger.toString()}!`)
        .setFooter({ text: 'You have 30 seconds to accept this game.' })
        .setColor('#2c2d31')
      if (wager) {
        rpsEmbed.addFields({ name: 'Wager', value: `${client.emoji.nibs}${wager}` })
      }
      await interaction.reply({ embeds: [client.embeds.success('Your game request has been sent.')], ephemeral: true })
      const pending = await interaction.channel.send({ content: challenged.toString(), embeds: [rpsEmbed], components: [acceptDenyRow], allowedMentions: { users: [challenged.id] } });
      const pendingCollector = pending.createMessageComponentCollector({ componentType: ComponentType.Button, time: 30000, filter: f => ['deny', 'accept'].includes(f.customId) });
      const pendingStart = Date.now() + 30000;

      let gameCollector: InteractionCollector<ButtonInteraction<"cached">>;
      pendingCollector.on('collect', async (c) => {
        if (c.user.id == challenger.id) {
          await c.reply({ embeds: [client.embeds.attention(`You need to wait for ${challenged.toString()} to accept this challenge. This request will expire <t:${Math.floor(pendingStart / 1000)}:R>.`)], ephemeral: true })
          return;
        };
        if (c.user.id !== challenged.id) {
          await c.reply({ embeds: [client.embeds.attention(`This is not your challenge to accept. Run </rps:${interaction.commandId}> to create your own game!`)], ephemeral: true })
          return;
        };
        if (c.customId == 'deny') {
          const embed = new EmbedBuilder()
            .setColor('Red')
            .setDescription(`🙅: ${challenged.toString()} has rejected this rock paper scissors request.`);
          await c.update({ embeds: [{ description: 'Rock Paper Scissors game cancelled.', color: 0x2c2d31 }], components: [] });
          pendingCollector.stop('denied')
          await interaction.followUp({ embeds: [embed], ephemeral: true });
          return;
        };
        if (c.customId == 'accept') {
          const embed = new EmbedBuilder()
            .setColor('Green')
            .setDescription('Make your move by chooosing rock, paper or scissors. The winner will be announced after both users have made their move!')
            .setFooter({ text: 'You have 45 seconds to make your moves.'})
          const rpsRow = new ActionRowBuilder<ButtonBuilder>()
            .setComponents([
              new ButtonBuilder({ customId: '0', label: '🪨', style: ButtonStyle.Secondary }),
              new ButtonBuilder({ customId: '1', label: '📃', style: ButtonStyle.Secondary }),
              new ButtonBuilder({ customId: '2', label: '✂️', style: ButtonStyle.Secondary })
            ]);
          const game = await c.update({ embeds: [embed], components: [rpsRow] });
          gameCollector = game.createMessageComponentCollector({ componentType: ComponentType.Button, filter: f => ['0', '1', '2'].includes(f.customId), time: 45000 });
          pendingCollector.stop('accepted');
        }
      });

      let challengerChoice: number;
      let challengedChoice: number;
      gameCollector.on('collect', async (c) => {
        if (c.user.id !== challenged.id && c.user.id !== challenger.id) {
          await c.reply({ embeds: [client.embeds.attention(`This is not your game to play. Run </rps:${interaction.commandId}> to create your own game!`)], ephemeral: true })
          return;
        };
        if (challengerChoice && challengedChoice) {
          const result = getWinner(challengerChoice, challengedChoice);
          if (result == 'draw') {
            const drawEmbed = new EmbedBuilder()
              .setTitle('It\'s a draw!')
              .setDescription(`You both played ${challengedChoice == 0 ? '🪨' : challengedChoice == 1 ? '📃' : '✂️'}`)
              .setColor('#454a64')
            await c.update({ embeds: [drawEmbed] })
            return
          }
        }; 
        
        const choice = Number(c.customId) as 0 | 1 | 2;
        if (c.user.id == challenged.id) {
          challengedChoice = choice;
        } else {
          challengerChoice = choice;
        };
      })

      pendingCollector.on('end', async (_c, reason) => {
        if (reason == 'time') {
          await pending.edit({ content: null, embeds: [{ description: `⏱️: Looks like ${challenged.toString()} didn't respond to the game!`}], components: [] })
          return;
        }
      })
    }
})

function getWinner(challenger: number, challenged: number) {
  if (challenged == challenger) { return 'draw' } 
  else if (challenger == 0 && challenged == 2 || challenger == 1 && challenged == 0 || challenger == 2 && challenged == 1) { return 'challenger' }
  else return 'challenged'
};