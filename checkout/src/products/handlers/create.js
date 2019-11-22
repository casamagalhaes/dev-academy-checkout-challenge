const dynamodb = require('aws-sdk/clients/dynamodb');
const uuid = require('uuid/v4');
const docClient = new dynamodb.DocumentClient();
const tableName = process.env.SAMPLE_TABLE;
exports.createProductHandler = async(event) => {
    try {
        if (event.httpMethod !== 'POST') {
            throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
        }

        console.info('received:', event);

        const body = JSON.parse(event.body);
        body.id = uuid();
        const Item = Object.assign({}, body);

        var params = {
            TableName: tableName,
            Item
        };

        const { requestContext } = event;
        const Location = !!requestContext ? `https://${requestContext.domainName}${requestContext.path}/${body.id}` : body.id;
        const result = await docClient.put(params).promise();
        const response = {
            statusCode: 201,
            headers: {
                Location,
                "Access-Control-Allow-Origin": "*"
            }
        };

        return response;
    } catch (error) {
        console.log('error %j', error);
        const response = {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            body: JSON.stringify(error)
        }
        return response;
    }
}

// sam package --s3-bucket=dev-academy-bessa-build --template-file=./template.yml --output-template-file=./template-export.yml --region=us-east-2
// aws cloudformation deploy --template-file ./template-export.yml --stack-name dev-academy-sales --region us-east-2 --capabilities CAPABILITY_IAM
