
export function addToActionsToSync(groceryListId, actionType, item) {
  let actionsToSync = getActionsToSync();
  if (actionsToSync === null) {
    actionsToSync = [];
  }
  let newAction = {groceryListId: groceryListId, actionType: actionType, item: item};
  const newActionsToSync = [...actionsToSync, newAction];
  storeActionsToSync(newActionsToSync);
}

export function removeFromActionsToSync(action) {
  let actionsToSync = getActionsToSync();
  let newActionsToSync = actionsToSync.filter(item => !(item.groceryListId === action.groceryListId && item.actionType === action.actionType && item.item === action.item));
  storeActionsToSync(newActionsToSync);
}

function storeActionsToSync(newActionsToSync) {
  localStorage.setItem("dftl.actionsToSync", JSON.stringify(newActionsToSync));
}

export function getActionsToSync() {
  return JSON.parse(localStorage.getItem("dftl.actionsToSync"));
}