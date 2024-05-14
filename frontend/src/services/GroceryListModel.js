class GroceryListModel {

  constructor(name, id, description, items) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.items = items;
  }

  add(item) {
    this.items.push(item);
  }

  remove(name) {
    const index = this.items.map(e => e.name).indexOf(name);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }
}

export default GroceryListModel;