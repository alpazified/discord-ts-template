import { SelectMenu } from "../../structures/selectMenu";

export default new SelectMenu({
    customId: 'example',
    execute: async ({ interaction }) => {
        interaction.reply({ content: `Example select menu.` });
    }
})