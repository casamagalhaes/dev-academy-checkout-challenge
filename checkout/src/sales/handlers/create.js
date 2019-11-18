const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

const tableName = process.env.SAMPLE_TABLE;

exports.createSaleHandler = async(event) => {
    if (event.httpMethod !== 'POST') {
        throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
    }

    console.info('received:', event);

    const body = JSON.parse(event.body)
    const id = body.id;
    const timestamp = new Date().toISOString();
    const totalPrice = body.totalPrice;
    const items = body.items;
    const payment = body.payment;

    var params = {
        TableName: tableName,
        Item: { id, timestamp, totalPrice, items, payment }
    };

    const result = await docClient.put(params).promise();

    const response = {
        statusCode: 200,
        body: JSON.stringify(body)
    };

    return response;
}