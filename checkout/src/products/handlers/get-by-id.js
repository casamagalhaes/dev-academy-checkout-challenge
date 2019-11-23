const tableName = process.env.SAMPLE_TABLE;
const dynamodb = require("aws-sdk/clients/dynamodb");
const docClient = new dynamodb.DocumentClient();

exports.getByIdHandler = async event => {
  if (event.httpMethod !== "GET") {
    throw new Error(
      `getMethod only accept GET method, you tried: ${event.httpMethod}`
    );
  }

  const id = event.pathParameters.id;

  const params = {
    TableName: tableName,
    Key: { id: id }
  };

  const data = await docClient.scan(params).promise();
  const item = data.Item;

  const response = {
    statusCode: 200,
    body: JSON.stringify(item),
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  };
  console.info(
    `response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`
  );
  return response;
};
