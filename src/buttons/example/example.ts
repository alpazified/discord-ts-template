import { Button } from "../../structures/Button";

export default new Button({
    customId: 'example',
    permission: 'SendMessages',
    cooldown: 1000,
    execute: async ({ interaction }) => {
        return interaction.reply({ content: 'Example Button'})
    }
});