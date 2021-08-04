const {usernameController} = require('../../../../src').handlers

describe('it should return the proper construction of object when ', () => {
    
    it('given correct parameters', async () => {
        const user = {
            username: 'testUsername'
        };

        const event = {
            httpMethod: 'GET',
            username: user.username
        }

        const res = await usernameController(event)

        expect(res.body).toEqual({
            user,
            query:{},
            meta:{}
        })
    })
})