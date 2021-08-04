const mock = require('../mockDB')
const { getCategoryFunction } = require('../../../../../src').handlers

describe('it should contact the db to get categories ', () => {
    beforeAll( () => {
       return mock.mock();
    })
    afterAll(() => {
        console.log('running after all');
        return mock.done();
    })
    it('when it is given the correct body', async () => {
       
        const username = 'testUser1';
        const categories = { categories: ['sad','mad','glad']};
        const event = {
            body: {
                meta: {},
                query: {},
                user: {
                    username
                }
            },
            result:{}
        }

        const res = await getCategoryFunction(event);
        expect(res.result.body).toEqual(categories);
    })
})