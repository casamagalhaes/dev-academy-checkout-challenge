exports.getAllProductsMockHandler = async(event) => {
    if (event.httpMethod !== 'GET') {
        throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
    }

    const products = [{
            id: 0,
            name: 'Suco de uva tinto integral aliança garrafa 1l',
            brand: 'Aliança',
            description: 'Garrafa 1 litro',
            price: 13.96
        },
        {
            id: 1,
            name: 'Suco do bem todo dia caju 200ml',
            brand: 'Do Bem',
            description: 'Caixa 200ml',
            price: 1.66
        },
        {
            id: 2,
            name: 'Suco maratá uva embalagem 200ml',
            brand: 'Maratá',
            description: 'Embalagem 200ml',
            price: 1.90
        },
        {
            id: 3,
            name: 'Suco pronto Del Valle fresh limão 250ml',
            brand: 'Del Valle',
            description: 'Pet 250ml',
            price: 2.34
        },
        {
            id: 4,
            name: 'Suco pronto jandaia caju caixa 1l',
            brand: 'Jandaia',
            description: 'Caixa 1 litro',
            price: 6.59
        },
        {
            id: 5,
            name: 'Suco pronto tampico uva garrafa 330ml',
            brand: 'Tampico',
            description: 'Garrafa 330ml',
            price: 1.96
        }
    ]

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(products)
    };

    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}