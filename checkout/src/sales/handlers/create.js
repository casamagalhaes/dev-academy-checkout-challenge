const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

const TableName = process.env.SAMPLE_TABLE;

exports.createSaleHandler = async event => {
  if (event.httpMethod !== "POST") {
    throw new Error(
      `postMethod only accepts POST method, you tried: ${event.httpMethod} method.`
    );
  }

  console.info("received:", event);

  const body = JSON.parse(event.body);
  const id = body.id;
  const timestamp = new Date().toISOString();
  const totalPrice = body.totalPrice;
  const items = body.items;
  const payment = body.payment;

  var params = {
    TableName,
    Item: { id, timestamp, totalPrice, items, payment }
  };

  const result = await docClient.put(params).promise();

  const response = {
    statusCode: 201,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify(body)
  };

  return response;
};
