const TableName = process.env.SAMPLE_TABLE;

const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.getAllHandler = async event => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getAllItems only accept GET method, you tried: ${event.method}`
    );
  }

  console.info("received:", event);

  var params = {
    TableName
  };

  const data = await docClient.scan(params).promise();
  const items = data.Items;

  const response = {
    statusCode: 200,
    body: JSON.stringify(items),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };

  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );

  return response;
};
