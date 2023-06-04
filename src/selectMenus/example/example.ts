import { SelectMenu } from "../../structures/selectMenu";

export default new SelectMenu({
    customId: 'skillLevel',
    execute: async ({ interaction }) => {
        interaction.reply({ content: `Example select menu.` });
    }
})