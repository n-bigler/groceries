import GroceryList from "@/services/GroceryList";
import {db} from "@/services/db";
import {ActionState, ActionType, TargetType} from "@/services/Action";
import Item from "@/services/Item";
import GroceryListRemoteService from "@/services/GroceryListRemoteService";

export default class GroceryListLocalService {

  static addGroceryList(groceryList: GroceryList): void {
    try {
      db.groceryLists.add(groceryList);
      db.actions.add({actionType: ActionType.Add, targetType: TargetType.GroceryList, target: groceryList, state: ActionState.New});
    } catch (error) {
      console.log(error);
    }
  }

  static deleteGroceryList(groceryList: GroceryList): void {
    try {
      db.groceryLists.delete(groceryList.id);
      db.actions.add({actionType: ActionType.Delete, targetType: TargetType.GroceryList, target: groceryList, state: ActionState.New});
    } catch (error) {
      console.log(error);
    }
  }

  static async subscribeToGroceryList(groceryListId: string) {
    try {
      const groceryList = await GroceryListRemoteService.subscribeToGroceryList(groceryListId);
      if (groceryListId != undefined) {
        db.groceryLists.put(groceryList as GroceryList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async fetchGroceryLists() {
    try {
      const groceryLists = await GroceryListRemoteService.fetchGroceryLists();
      groceryLists.forEach((groceryList: GroceryList) => {
        db.groceryLists.put(groceryList, groceryList.id);
      });
      const groceryListIds = groceryLists.map((groceryLists: GroceryList) => groceryLists.id)
      db.groceryLists.where("id").noneOf(groceryListIds)
        .delete();
      return groceryLists;
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }

  static addItem(item: Item): void {
    db.items.add(item);
    db.actions.add({actionType: ActionType.Add, targetType: TargetType.Item, target: item, state: ActionState.New});
  }

  static deleteItem(item: Item): void {
    db.items.delete(item.name);
    db.actions.add({actionType: ActionType.Delete, targetType: TargetType.Item, target: item, state: ActionState.New});
  }

  static async fetchItems(groceryListId: string) {
    console.log("fetching items");
    const items: Item[] = await GroceryListRemoteService.fetchItems(groceryListId);
    try {
      items.forEach((item: Item) => db.items.put(item, item.name));
      const remainingNames = items.map((item: Item) => item.name);
      db.items.where("groceryListId").equals(groceryListId)
        .and((item: Item) => !remainingNames.includes(item.name))
        .delete();
    } catch (error) {
      console.log(error);
    }
  }
}