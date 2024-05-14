import {currentSession} from "./authService";
import GroceryListModel from "./GroceryListModel";

export async function getGroceryListWithItems(groceryListId) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryListId, {
    method: 'GET',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await currentSession())}`
    }
  });
  if(!rawResponse.ok) {
    const message = `Could not fetch groceries: ${rawResponse.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}

export async function addItem(groceryList, item) {
  item.name = item.name.trim();
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryList.id, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await currentSession())}`
    },
    body: JSON.stringify(item)
  });
  if(!rawResponse.ok) {
    const message = `Could not add item: ${response.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}

export async function deleteItem(groceryList, name) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryList.id+'/'+name.trim(), {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await currentSession())}`
    }
  });
  if(!rawResponse.ok) {
    const message = `Could not delete item: ${response.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}

export async function createGroceryList(groceryList) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await currentSession())}`
    },
    body: JSON.stringify(groceryList)
  });
  if(!rawResponse.ok) {
    const message = `Could not create grocery list: ${response.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}

export async function subscribeToGroceryList(groceryListId) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/' + groceryListId, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await currentSession())}`
    }
  });
  if(!rawResponse.ok) {
    const message = `Could not create grocery list: ${response.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}

export async function getGroceryLists() {
  console.log("getting grocery list")
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist', {
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
  return await rawResponse.json();
}

export async function deleteGroceryList(groceryListId) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryListId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await currentSession())}`
    }
  });
  if(!rawResponse.ok) {
    const message = `Could not delete grocery list: ${response.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}
