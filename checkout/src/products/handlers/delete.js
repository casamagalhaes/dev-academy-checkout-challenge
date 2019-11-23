const dynamodb = require("aws-sdk/clients/dynamodb");
const db = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;

module.exports.deleteProduct = async event => {
  try {
    if (event.httpMethod !== "DELETE") {
      throw new Error(
        `delete product only accepts GET method, you tried: ${event.httpMethod} method.`
      );
    }

    const id = event.pathParameters.id;

    const params = {
      TableName: tableName,
      Key: {
        id: id
      }
    };

    await db.delete(params).promise();

    const response = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    };

    return response;
  } catch (error) {
    return error;
  }
};
