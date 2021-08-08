const mock = require('../mockDB')
const {getUserComplimentFunction} = require('../../../../../src').handlers

describe('It should return a compliment based off the users preferences ', () => {
    beforeAll( () => {
        mock.mock();
    })
    afterAll( () => {
        return mock.done();
    })
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
        expect(res.result.body).toEqual({compliment:answer});
    })
})