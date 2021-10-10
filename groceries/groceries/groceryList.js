'use strict';
const AWS = require('aws-sdk');

const dynamo = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');


exports.handler =  (event, context, lambdaCallback) => {

  console.log('Received event:', JSON.stringify(event, null, 2));


  const username = event.requestContext.authorizer.jwt.claims['cognito:username'];


  switch (event.requestContext.http.method) {
    case 'POST':
      try {
        const groceryList = JSON.parse(event.body);
        return createGroceryList(groceryList, username, lambdaCallback);
      } catch (error) {
        console.error(error);
        return done(400, '{"message":"Invalid JSON body"}', 'application/json', lambdaCallback);
      }
    case 'GET':
      return getGroceryListForUser(username, lambdaCallback);
    case 'DELETE':
      return deleteGroceryList(event.pathParameters.groceryListId, username, lambdaCallback);
    case 'PATCH':
      return subscribeGroceryList(event.pathParameters.groceryListId, username, lambdaCallback);
    default:
      throw new Error(`Unrecognized operation "${operation}"`);
  }
};

function createGroceryList(groceryList, username, lambdaCallback) {
  const groceryListId = uuid.v4();
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    Item: {
      PK: 'GROCERY_LIST#'+groceryListId,
      SK: 'USER#'+username,
      name: groceryList.name,
      description: groceryList.description,
      isOwner: true
    }
  };
  console.log("inserting: " + JSON.stringify(params, null, 2));
  dynamo.put(params, function(error, data) {
    if (error) {
      console.error('DynamoDB error on put: ', error);
      return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
    } 
    const newGroceryList = {
      id: groceryListId, 
      name: groceryList.name, 
      description: groceryList.description,
      isOwner: true
    };
    console.log("data: " + JSON.stringify(data, null, 2));
    return done(200, JSON.stringify(newGroceryList, null, 2), 'application/json', lambdaCallback);
  });  
}

function getGroceryListForUser(username, lambdaCallback) {
  const params = {
    TableName: process.env.DYNAMODB_TABLE,
    IndexName: 'InvertedIndex',
    KeyConditionExpression: 'SK = :sKey',
    ExpressionAttributeValues: {
      ':sKey': 'USER#'+username
    }
  };
  console.log("Query: " + JSON.stringify(params, null, 2));
  dynamo.query(params, function(error, data) {
    if (error) {
      console.error('DynamoDB error on read: ', error);
      return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
    }
    const result = [];
    data.Items.forEach((groceryList) => {
      const groceryListId = groceryList.PK.substring(13);
      result.push({name:groceryList.name, description: groceryList.description, id: groceryListId, isOwner: groceryList.isOwner})
    });

    return done(200, JSON.stringify(result, null, 2), 'application/json', lambdaCallback);
  });
}

function deleteGroceryList(groceryListId, username, lambdaCallback) {
  getGroceryListAndItems(groceryListId, (groceryList) => {
    const isOwner = groceryList.filter(item => item.SK === 'USER#'+username)[0].isOwner;
    console.log('isOwner: ' + isOwner);
    if (isOwner) {
      const tableName = process.env.DYNAMODB_TABLE;
      const deleteRequests = groceryList.map(item => {
        return {
          DeleteRequest: {
            Key: { 
              PK: item.PK,
              SK: item.SK
             }
          }
        }
      });
      const params = {
        RequestItems: {
          [tableName]: deleteRequests
        }
      };
      console.log("delete (batch): " + JSON.stringify(params, null, 2));
      dynamo.batchWrite(params, function(error, data) {
        if (error) {
          console.error('DynamoDB error on delete: ', error);
          return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
        }
        return done(200, '{"message":"List successfully deleted"}', 'application/json', lambdaCallback);
      });
    } else {
      const params = {
        TableName: process.env.DYNAMODB_TABLE,
        Key: {
          PK: 'GROCERY_LIST#'+groceryListId,
          SK: 'USER#'+username
        }
      };
    
      console.log("delete: " + JSON.stringify(params, null, 2));
      dynamo.delete(params, function(error, data) {
        if (error) {
          console.error('DynamoDB error on delete: ', error);
          return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
        }
        return done(200, '{"message":"Succesfully unsubscribed from list"}', 'application/json', lambdaCallback);
      });
    }
  });
}

function getGroceryListAndItems(groceryListId, callback) {
   const params = {
    TableName: process.env.DYNAMODB_TABLE,
    KeyConditionExpression: 'PK = :pKey',
    ExpressionAttributeValues: {
      ':pKey': 'GROCERY_LIST#'+groceryListId
    }
  };
  console.log("Query: " + JSON.stringify(params, null, 2));
  dynamo.query(params, function(error, data) {
    if (error) {
      console.error('DynamoDB error on read: ', error);
      throw new Error('Could not delete grocery list');
    }
    console.log("received: " + JSON.stringify(data, null, 2));
    callback(data.Items);
  });
} 

function subscribeGroceryList(groceryListId, username, lambdaCallback) {
  getGroceryListAndItems(groceryListId, (groceryListItems) => {
    const groceryList = groceryListItems[0]
    const params = {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        PK: 'GROCERY_LIST#'+groceryListId,
        SK: 'USER#'+username,
        name: groceryList.name,
        description: groceryList.description,
        isOwner: false
      }
    };
    console.log("inserting: " + JSON.stringify(params, null, 2));
    dynamo.put(params, function(error, data) {
      if (error) {
        console.error('DynamoDB error on put: ', error);
        return done(500, '{"message":"Internal Server Error"}', 'application/json', lambdaCallback);
      } 
      const newGroceryList = {
        id: groceryListId, 
        name: groceryList.name, 
        description: groceryList.description,
        isOwner: false
      };
      console.log("data: " + JSON.stringify(data, null, 2));
      return done(200, JSON.stringify(newGroceryList, null, 2), 'application/json', lambdaCallback);
    });  
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

