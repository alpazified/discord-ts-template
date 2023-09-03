import { Command } from '../../structures/Command';
import { interactions } from '../../interactions';
import { forceUser } from '../../schemas/user';
import { GuildMember, EmbedBuilder } from 'discord.js';

export default new Command({
    interaction: interactions.profile,
    execute: async ({ client, interaction, options }) => {
        const user = options.getMember('user') as GuildMember || interaction.member as GuildMember;
        const profile = await forceUser(user.user?.id);
        if (!profile) {
            return await interaction.reply({ embeds: [client.embeds.attention('This user has not setup their account yet.')], ephemeral: true });
        };

        let totalItems: number;
        profile.inventory?.forEach((i) => {
            if (i.amount > 1) {
                totalItems += i.amount;
            } else {
                totalItems++;
            }
        })

        const profileEmbed = new EmbedBuilder()
            .setAuthor({ name: user.user.username })
            .setThumbnail(user.user.displayAvatarURL())
            .addFields(
                {
                    name: 'Level',
                    value: `Level: **${profile.experience.level || 0}**\nXP Gained: **${profile.experience.xp || 0}xp**`,
                    inline: true
                },
                {
                    name: 'Economy',
                    value: `Nibs: ${client.emoji.nibs}${profile.nibs || 0}\nNet Worth: ${client.emoji.nibs}${profile.netWorth || 0}`,
                    inline: true
                },
                {
                    name: 'Inventory',
                    value: `Unique Items: **${profile.inventory.length || 0}**\nTotal Items: **${totalItems || 0}**`,
                    inline: true
                },
                {
                    name: 'Stats',
                    value: `Check Ins: **${profile.checkIns || 0}**\nBounties Completed: **f${profile.bounties || 0}**\nWorks Showcased: **${Math.floor(Number(profile.userID) / 15) || 0}**`
                }
            )
            .setColor(client.colors.invisible);

        await interaction.reply({ embeds: [profileEmbed] })

    }
});