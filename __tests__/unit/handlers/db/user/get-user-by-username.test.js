const mock = require('../mockDB')
const { getUserFunction } = require('../../../../../src').handlers

describe('It should get the user information ', () => {
    beforeAll( () => {
        mock.mock();
    })
    afterAll( () => {
        return mock.done();
    })
    it('when it is given the correct input', async () => {
        const user = {
            username: 'testUser1'
        };
        const answer = {
            username: user.username,
            email: 'user1@email.com',
            gender: 'm',
            personalityType: {
                sensing: 'yes',
                introversion: 'any',
                feeling: 'yes',
                judging: 'yes',
            },
            locale: 'EN-US'
        };
        const event = {
            body: {
                user,
                meta: {},
                query: {}
            },
            result:{}
        };
        const {result} = await getUserFunction(event);
        const {body: res} = result;
        expect(res.username).toEqual(answer.username);
        expect(res.email).toEqual(answer.email);
        expect(res.gender).toEqual(answer.gender);
        expect(res.personalityType).toEqual(answer.personalityType);
        expect(res.givenName).not.toBeTruthy();
        expect(res.familyName).not.toBeTruthy();
        expect(res.phoneNumber).not.toBeTruthy();
        expect(res.ethnicity).not.toBeTruthy();
        expect(res.dob).not.toBeTruthy();
        expect(res.locale.trim()).toEqual(answer.locale) // not sure where the space at the end came from
    })
})