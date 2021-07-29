const {usernameController} = require('../../../../src/handlers').handlers

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
            meta:{}
        })
    })
})