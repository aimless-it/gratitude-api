const mock = require('../mockDB')
const {getComplimentFunction} = require('../../../../../src').handlers

describe('It should get a random compliment from the db based on ', () => {
    beforeAll( () => {
        mock.mock();
    })
    afterAll( () => {
        return mock.done();
    })
    it('when it is given the correct input', async () => {
        const answer = 'youre a good person';
        const query = {
            personalityType: {
                sensing: 'no',
                introversion: 'yes',
                feeling: 'yes',
                judging: 'any'
            },
            category: 'mad'
        };
        const event = {
            body: {
                query,
                meta: {},
                user: {}
            },
            result: {}
        };
            const res = await getComplimentFunction(event);
            expect(res.result.body).toEqual({compliment: answer});
    })
})