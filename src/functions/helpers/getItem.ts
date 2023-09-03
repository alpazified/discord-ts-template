import fs from 'node:fs';
import { Item } from '../../interfaces/user.js';

/**
 * @param id - The id of the item to get
 * @returns The item data, or undefined if not found
 */
export async function getItem(id: string): Promise<Item | undefined> {
  const data = await new Promise<string>((resolve, reject) => {
    fs.readFile('./src/resources/items.json', 'utf8', (error, data) => {
      if (error) reject(error);
      else resolve(data);
    });
  });

  const items = JSON.parse(data) as Item[];
  return items.find((item: Item) => item.id == id.toLowerCase().replaceAll(/\s+/g, ''));
}