import { fishCommand } from "./fun/fish";
import { rpsCommand } from "./fun/rps";
import { buyCommand } from "./utility/buy";
import { profileCommand } from "./utility/profile";
import { shopCommand } from "./utility/shop";
import { winCommand } from "./utility/win";

export const interactions = {
	buy: buyCommand,
	fish: fishCommand,
	profile: profileCommand,
	rps: rpsCommand,
	shop: shopCommand,
	win: winCommand
};