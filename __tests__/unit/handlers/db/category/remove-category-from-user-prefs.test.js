require('dotenv').config()
const {removeCategoryFunction} = require('../../../../../src/handlers').handlers

describe('It should remove categories from a users subscription ', () => {
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
            body: JSON.stringify({
                meta:{},
                query: {},
                user
            })
        };
        const res = await removeCategoryFunction(event);
        expect(res).toEqual(categories);
    })
})