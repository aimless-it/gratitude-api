const {usernameController} = require('../../../../src').handlers

describe('it should return the proper construction of object when ', () => {
    
    it('given correct parameters', async () => {
        const user = {
            username: 'testUsername'
        };

        const event = {
            httpMethod: 'GET',
            pathParameters: user
        }

        const res = await usernameController(event)

        expect(res).toEqual({
            user,
            query:{},
            meta:{},
            result: {
                statusCode: 200,
                headers: {
                    'Access-Origin-Accept-Headers': '*',
                    'Access-Origin-Accept-Origin': '*',
                    'Access-Origin-Accept-Methods': '*',
                    'Content-Type': 'application/json'
                },
            }
        })
    })
})