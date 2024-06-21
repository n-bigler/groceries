import {v4 as uuidv4} from 'uuid';

export default class GroceryList {

  public id: string;
  public name: string;
  public description: string;
  public isOwner: boolean;

  public constructor(name: string, description: string, isOwner: boolean);
  public constructor(name: string, description: string, isOwner: boolean, id: string);
  public constructor(name: string, description: string, isOwner: boolean, id?: string) {
    this.id = id ? id : uuidv4();
    this.name = name;
    this.description = description;
    this.isOwner = isOwner;
  }
}