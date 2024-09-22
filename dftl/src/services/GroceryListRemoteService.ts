import GroceryList from "@/services/GroceryList";
import {currentSession} from "@/services/authService";
import Item from "@/services/Item";

export default class GroceryListRemoteService {

  static async addGroceryList(groceryList: GroceryList) {
    console.log("Creating grocery list...");
    const rawResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v2/grocerylist', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await currentSession())}`
      },
      body: JSON.stringify(groceryList)
    });

    if(!rawResponse.ok) {
      console.log(`Could not create grocery list: ${rawResponse.status}`);
      return Result.Error;
    }
    console.log("Grocery list created");
    return Result.Success;
  }

  static async deleteGroceryList(groceryList: GroceryList) {
    console.log(`deleting grocery list ${groceryList.id}`);
    const rawResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/v2/grocerylist/'+encodeURIComponent(groceryList.id), {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await currentSession())}`
      }
    });
    if(!rawResponse.ok) {
      console.log(`Could not delete grocery list: ${rawResponse.status}`);
      return Result.Error;
    }
    return Result.Success;
  }

  static async fetchGroceryLists() {
    const rawResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/grocerylist', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await currentSession())}`
      }
    });
    if(!rawResponse.ok) {
      const message = `Could not fetch grocery lists: ${rawResponse.status}`;
      throw new Error(message);
    }
    const json = await rawResponse.json();

    return await json.map((entry: any) => this.toGroceryList(entry));
  }

  static async subscribeToGroceryList(groceryListId: string) {
    const rawResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/grocerylist/' + encodeURIComponent(groceryListId), {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await currentSession())}`
      }
    });
    if(!rawResponse.ok) {
      const message = `Could not subscribe to grocery list: ${rawResponse.status}`;
      throw new Error(message);
    }
    const json = await rawResponse.json();
    return this.toGroceryList(json);
  }

  private static toGroceryList(data: any) {
    console.log(data)
    return data ? new GroceryList(data['name'], data['description'], data['isOwner'], data['id']) : undefined;
  }

  static async addItem(item: Item) {
    console.log("Creating item...");
    const rawResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/grocerylist/' + encodeURIComponent(item.groceryListId), {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await currentSession())}`
      },
      body: JSON.stringify(item)
    });

    if(!rawResponse.ok) {
      console.log(`Could not create item: ${rawResponse.status}`);
      return Result.Error;
    }
    console.log("Item created");
    return Result.Success;
  }

  static async deleteItem(item: Item) {
    console.log(`deleting item ${item.name}`);
    const rawResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/grocerylist/'+encodeURIComponent(item.groceryListId) + '/item', {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await currentSession())}`
      },
      body: JSON.stringify(item.name)
    });
    if(!rawResponse.ok) {
      console.log(`Could not delete item list: ${rawResponse.status}`);
      return Result.Error;
    }
    console.log("Item deleted");
    return Result.Success;
  }

  static async fetchItems(groceryListId: string) {
    const rawResponse = await fetch(process.env.NEXT_PUBLIC_API_URL + '/grocerylist/' + encodeURIComponent(groceryListId), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${(await currentSession())}`
      }
    });
    if(!rawResponse.ok) {
      const message = `Could not fetch grocery lists: ${rawResponse.status}`;
      throw new Error(message);
    }
    const json = await rawResponse.json();
    return await json["items"].map((entry: any) => this.toItem(entry, groceryListId));
  }

  private static toItem(data: any, groceryListId: string) {
    return data ? new Item(data['name'], data['quantity'], groceryListId) : undefined;
  }
}

export enum Result {
  Success = "SUCCESS",
  Error = "ERROR"
}