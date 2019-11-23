const dynamodb = require("aws-sdk/clients/dynamodb");
const uuid = require("uuid/v4");
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;

exports.createProductHandler = async event => {
  try {
    if (event.httpMethod !== "POST") {
      throw new Error(
        `Create product only accepts POST method, you tried: ${event.httpMethod} method.`
      );
    }

    const body = JSON.parse(event.body);
    body.id = uuid();
    const Item = Object.assign({}, body);

    var params = {
      TableName: tableName,
      Item
    };

    await docClient.put(params).promise();
    const response = {
      statusCode: 201,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };
    return response;
  } catch (error) {
    return error;
  }
};
