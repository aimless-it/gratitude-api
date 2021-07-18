require('dotenv').config();
const {subscribeCategoryFunction} = require('../../../../../src/handlers').handlers

describe('It should add a category to the user preferences when ', () => {
    it('it is given the correct input', async () => {
        const categories = [
            'sad',
            'glad'
        ]
        const user = {
            username: 'testUser2',
            category: 'glad'
        };
        const event = {
            body: JSON.stringify({
                user,
                meta: {},
                query: {}
            })
        };
        const res = await subscribeCategoryFunction(event);
        expect(res).toEqual(categories)
    })
})