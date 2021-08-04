const mock = require('../mockDB')
const {subscribeCategoryFunction} = require('../../../../../src').handlers

describe('It should add a category to the user preferences when ', () => {
    beforeAll( () => {
        mock.mock();
    })
    afterAll( () => {
        return mock.done();
    })
    it('it is given the correct input', async () => {
        const categories = {
            categories:[
            'sad',
            'glad'
        ]}
        const user = {
            username: 'testUser2',
            category: 'glad'
        };
        const event = {
            body: {
                user,
                meta: {},
                query: {}
            },
            result:{}
        };
        const res = await subscribeCategoryFunction(event);
        expect(res.result.body).toEqual(categories)
    })
})