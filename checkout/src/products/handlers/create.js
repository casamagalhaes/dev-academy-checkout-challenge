const TableName = process.env.SAMPLE_TABLE;

const dynamodb = require("aws-sdk/clients/dynamodb");
const uuid = require("uuid/v4");
const docClient = new dynamodb.DocumentClient();

exports.createHandler = async event => {
  try {
    if (event.httpMethod !== "POST") {
      throw new Error(
        `postMethod only accepts POST method, you tried: ${event.method} method.`
      );
    }

    console.info("received:", event);

    const body = JSON.parse(event.body);
    body.id = uuid();

    const Item = Object.assign({}, body);

    var params = {
      TableName,
      Item
    };

    const { requestContext } = event;
    const Location = !!requestContext
      ? `https://${requestContext.domainName}${requestContext.path}/${body.id}`
      : body.id;

    await docClient.put(params).promise();

    const response = {
      statusCode: 201,
      headers: {
        Location,
        "Access-Control-Allow-Origin": "*"
      }
    };

    return response;
  } catch (error) {
    console.log("error %j", error);

    const response = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify(error)
    };

    return response;
  }
};
