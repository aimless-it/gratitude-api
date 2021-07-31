require('dotenv').config();
const {getUserComplimentFunction} = require('../../../../../src/handlers').handlers

describe('It should return a compliment based off the users preferences ', () => {
    it('when given correct input', async () => {
        const user = {
            username: 'testUser1'
        };
        const answer = 'you are good';
        const event = {
            body: {
                meta: {},
                query: {},
                user
            },
            result: {}
        };
        const res = await getUserComplimentFunction(event);
        expect(res.result.data).toEqual(answer);
    })
})