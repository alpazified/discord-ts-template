import { Schema, SchemaTypes, model } from "mongoose";
import { User } from "../interfaces/user";
import { Snowflake } from "discord.js";

const schema = new Schema({
  userID: { type: SchemaTypes.String, required: true, unique: true },
  nibs: { type: SchemaTypes.Number, required: true, default: 0 },
  checkIns: { type: SchemaTypes.Number, required: true, default: 0 },
  experience: {
    level: { type: SchemaTypes.Number, required: false, default: 0 },
    xp: { type: SchemaTypes.Number, required: false, default: 0 }
  },
  inventory: { type: SchemaTypes.Array, required: false, default: [] }
}, { versionKey: false });

const userModal = model<User>('user', schema);

export async function validateUser(id: Snowflake) {
  return await userModal.findOne({ userID: id });
};

export async function forceUser(id: Snowflake) {
  const user = await validateUser(id)
  if (!user) { return await userModal.create({ userID: id }); };
  return user;
};

export async function updateUserBalance(id: Snowflake, amount: number) {
  const user = await forceUser(id);
  await user.updateOne({ $inc: { nibs: amount } });
}