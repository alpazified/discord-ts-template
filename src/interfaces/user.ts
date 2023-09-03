import { Snowflake } from "discord.js"

export interface User extends Document {
    userID: Snowflake;
    nibs: number;
    bounties: number
    checkIns: number;
    netWorth: number;
    experience: {
        level: number;
        xp: number
    };
    inventory: InventoryType[]
};

export type InventoryType = {
    id: string;
    amount: number
}

export type Item = {
    name: string;
    description: string;
    id: string;
    sellable: boolean;
    buyable: boolean;
    emoji: string;
    price: number;
}