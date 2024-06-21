export default class Item {
  public groceryListId: string;
  public name: string;
  public quantity: string;

  public constructor(name: string, quantity: string, groceryListId: string) {
    this.groceryListId = groceryListId;
    this.name = name;
    this.quantity = quantity;
  }
}