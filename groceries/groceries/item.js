'use strict';
const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');


exports.handler =  (event, context, lambdaCallback) => {

  const groceryListId = decodeURIComponent(event.pathParameters.groceryListId);

  const username = event.requestContext.authorizer.jwt.claims['username'];

  switch (event.requestContext.http.method) {
    case 'POST':
      try {
        const item = JSON.parse(event.body);
        return addItemToGroceryList(item, groceryListId, lambdaCallback);
      } catch (error) {
        console.error(error);
        return done(400, '{"message":"Invalid JSON body"}', 'application/json', lambdaCallback);
      }
    case 'GET':
      return getItemsForGroceryList(groceryListId, username, lambdaCallback);
    case 'DELETE':
      const itemName = JSON.parse(event.body);
      return deleteItem(groceryListId, itemName, lambdaCallback);
    default:
      throw new Error(`Unrecognized operation "${operation}"`);
  }
};

function addItemToGroceryList(item, groceryListId, lambdaCallback) {

  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      PK: 'GROCERY_LIST#'+groceryListId,
      SK: 'ITEM#'+item.name,
      itemName: item.name,
      quantity: item.quantity
    }
  };
  console.log("inserting: " + JSON.stringify(params, null, 2));
  dynamo.put(params, function(error, data) {
    if (error) {
      console.error('DynamoDB error on put: ', error);
      return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
    } 
    return done(201, '{"message":"Success"}', 'application/json', lambdaCallback);
  });  
}

function getItemsForGroceryList(groceryListId, username, lambdaCallback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    KeyConditionExpression: 'PK = :pKey',
    ExpressionAttributeValues: {
      ':pKey': 'GROCERY_LIST#'+groceryListId
    }
  };
  console.log('query: ' + JSON.stringify(params, null, 2));
  dynamo.query(params, function(error, data) {
    if (error) {
      console.error('DynamoDB error on read: ', error);
      return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
    }
    const items = data.Items.filter(item => item.SK.startsWith('ITEM#'));
    const groceryList = data.Items.filter(item => item.SK === 'USER#'+username)[0];

    const response = {name: groceryList.name, description: groceryList.description, items:[]};
    items.forEach((item) => {
      response.items.push({name: item.itemName, quantity: item.quantity});
    });
    return done(200, JSON.stringify(response, null, 2), 'application/json', lambdaCallback);
  });
}

function deleteItem(groceryListId, itemName, lambdaCallback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Key: {
      PK: 'GROCERY_LIST#'+groceryListId,
      SK: 'ITEM#'+itemName
    }
  };
  console.log('delete: ' + JSON.stringify(params, null, 2));
  dynamo.delete(params, function(error, data) {
    if (error) {
      console.error('DynamoDB error on delete: ', error);
      return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
    }
    return done(200, '{"message":"item deleted"}', 'application/json', lambdaCallback);
  });
}
function done(statusCode, body, contentType, lambdaCallback) {
  lambdaCallback(null, {
    statusCode: statusCode,
    body: body,
    headers: {
      'Content-Type': contentType
    }
  });
}

