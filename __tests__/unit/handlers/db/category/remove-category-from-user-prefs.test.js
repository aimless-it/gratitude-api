const mock = require('../mockDB')
require('dotenv').config()
const {removeCategoryFunction} = require('../../../../../src').handlers

describe('It should remove categories from a users subscription ', () => {
    beforeAll( () => {
        mock.mock();
    })
    afterAll( () => {
        mock.done();
    })
    it('when it is given is given the correct input', async () => {
        const categories = [
            'sad',
            'mad'
        ]
        const user = {
            username: "testUser1",
            category: "glad"
        };
        const event = {
            body: {
                meta:{},
                query: {},
                user
            },
            result:{}
        };
        const res = await removeCategoryFunction(event);
        expect(res.result.body).toEqual(categories);
    })
})