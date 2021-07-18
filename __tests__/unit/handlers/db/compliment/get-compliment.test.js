require('dotenv').config();
const {getUserComplimentFunction} = require('../../../../../src/handlers').handlers

describe('It should return a compliment based off the users preferences ', () => {
    it('when given correct input', async () => {
        const user = {
            username: 'testUser1'
        };
        const answer = 'you are good';
        const event = {
            body: JSON.stringify({
                meta: {},
                query: {},
                user
            })
        };
        const res = await getUserComplimentFunction(event);
        expect(res).toEqual(answer);
    })
})