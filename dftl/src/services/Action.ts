import {v4 as uuidv4} from 'uuid';

export default interface Action {
  id: number;
  actionType: ActionType;
  targetType: TargetType;
  target: any;
  state: ActionState;
}

export enum ActionState {
  New = "NEW",
  InProcess = "IN_PROCESS"
}

export enum ActionType {
  Add= "ADD",
  Delete = "DELETE"
}

export enum TargetType {
  GroceryList= "GROCERY_LIST",
  Item = "ITEM"
}

