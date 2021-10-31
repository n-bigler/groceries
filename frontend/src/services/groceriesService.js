import { Auth } from 'aws-amplify';

export async function getGroceryListWithItems(groceryListId) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryListId, {
    method: 'GET',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` 
    }
  });
  if(!rawResponse.ok) {
    const message = `Could not fetch groceries: ${rawResponse.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}

export async function addItem(groceryListId, item) {
  item.name = item.name.trim();
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryListId, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` 
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

export async function deleteItem(groceryListId, name) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryListId+'/'+name.trim(), {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await Auth.currentSession()).getAccessToken().getJwtToken()}` 
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
      'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` 
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
      'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` 
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
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist', {
    method: 'GET',
    headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` 
    }
  });
  if(!rawResponse.ok) {
    const message = `Could not fetch grocery lists: ${rawResponse.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}

export async function deleteGroceryList(groceryListId) {
  const rawResponse = await fetch(process.env.REACT_APP_API_URL + '/grocerylist/'+groceryListId, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}` 
    }
  });
  if(!rawResponse.ok) {
    const message = `Could not delete grocery list: ${response.status}`;
    throw new Error(message);
  }
  const response = await rawResponse.json();
  return response;
}
