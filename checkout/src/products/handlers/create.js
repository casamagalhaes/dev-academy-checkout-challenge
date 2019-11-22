const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();
const uuid = require("uuid/v4");

const TableName = process.env.SAMPLE_TABLE;

exports.createProductHandler = async event => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }

  console.info("received:", event);

  const body = JSON.parse(event.body);
  const id = uuid();
  const timestamp = new Date().toISOString();
  const { name, brand, price, description } = body;

  var params = {
    TableName,
    Item: { id, name, brand, price, description }
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(result)
  };

  return response;
};
