// db.js
import Dexie from 'dexie';

export const db = new Dexie('groceries');
db.version(1).stores({
  groceryList: 'id',
  item: 'name, groceryListId'// Primary key and indexed props,
  events: ''
});

export async function putGroceryList(groceryList) {
  try {
    await db.groceryList.put(groceryList, groceryList.id);
  } catch (error) {
    console.log("failed to add groceryList to local DB");
  }
}
