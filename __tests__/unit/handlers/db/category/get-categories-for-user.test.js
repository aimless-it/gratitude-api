require('dotenv').config();
const { getCategoryFunction } = require('../../../../../src/handlers').handlers
describe('it should contact the db to get categories ', () => {
    it('when it is given the correct body', async () => {
       
        const username = 'testUser1';
        const categories = ['sad','mad','glad'];
        const event = {
            body: JSON.stringify({
                meta: {},
                query: {},
                user: {
                    username
                }
            })
        }

        const res = await getCategoryFunction(event);
        expect(res).toEqual(categories);
    })
})