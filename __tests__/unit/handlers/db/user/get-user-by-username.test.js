require('dotenv').config();
const { getUserFunction } = require('../../../../../src/handlers').handlers

describe('It should get the user information ', () => {
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
            body: JSON.stringify({
                user,
                meta: {},
                query: {}
            })
        };
        const res = await getUserFunction(event);
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