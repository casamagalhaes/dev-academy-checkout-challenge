const dynamodb = require('aws-sdk/clients/dynamodb');
const uuid = require('uuid/v4');
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;

exports.createSaleHandler = async(event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('received:', event);

    const body = JSON.parse(event.body);
    body.id = body.id || uuid();
    const Item = Object.assign({}, body);

    var params = {
        TableName: tableName,
        Item
    };

    const Location = !!a.requestContext ? `${a.requestContext.domainName}${a.requestContext.path}/${body.id}` : body.id;
    const result = await docClient.put(params).promise();
    const response = {
        statusCode: 201,
        Location,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(body)
    };

    return response;
}