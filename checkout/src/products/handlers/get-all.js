const tableName = process.env.SAMPLE_TABLE;
const dynamodb = require('aws-sdk/clients/dynamodb');
const docCLient = new dynamodb.DocumentClient();


exports.getAllProductsHandler = async(event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    console.info('received', event);
    var paramns = {
        tableName = tableName
    };

    const data = await docCLient.scan(paramns).promise();
    const items = data.Items;

    

    const response = {
        statusCode: 200,
        body: JSON.stringify(items),
        headers: {
            "Access-Control-Allow-Origin": "*"
        }
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}