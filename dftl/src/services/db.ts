// db.ts
import Dexie, {EntityTable, Table} from 'dexie';
import GroceryList from "@/services/GroceryList";
import Action from '@/services/Action';
import Item from "@/services/Item";

export class GroceryListsDexie extends Dexie {
  // 'groceryLists' is added by dexie when declaring the stores()
  // We just tell the typing system this is the case
  groceryLists!: EntityTable<GroceryList, 'id'>;
  items!: EntityTable<Item, 'name'>;
  actions!: EntityTable<Action, 'id'>;
  constructor() {
    super('groceryLists');
    this.version(3).stores({
      groceryLists: 'id', // Primary key and indexed props
      items: 'name,groceryListId',
      actions: '++id,state'
    });
  }
}

export const db = new GroceryListsDexie();
