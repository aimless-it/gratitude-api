require('dotenv').config()
const {getComplimentFunction} = require('../../../../../src/handlers').handlers

describe('It should get a random compliment from the db based on ', () => {
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
            body: JSON.stringify({
                query,
                meta: {},
                user: {}
            })
        };
            const res = await getComplimentFunction(event);
            expect(res).toEqual(answer);
    })
})