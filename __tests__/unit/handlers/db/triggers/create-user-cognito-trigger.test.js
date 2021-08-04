const mock = require('../mockDB')
const {UserCreationTrigger} = require('../../../../../src').handlers

describe('It should create a new user ', () => {
    beforeAll( () => {
        mock.mock();
    })
    afterAll( () => {
        return mock.done();
    })
    it('when given the proper information', async () => {
        const userAttributes = {
            given_name: 'given4',
            family_name: 'family4',
            email: 'user4@email.com',
            phone_number: '2345678901',
            gender: 'f',
            ethnicity: 'asian',
            birthdate: new Date(1978, 5, 24),
            locale: null
        }
        const event = {
            body: JSON.stringify({
                userName: 'testUser4',

                request: {
                    userAttributes
                }
            }),
        }
        const res = await UserCreationTrigger(event);
        expect(res.username).toEqual('testUser4');
        expect(res.email).toEqual(userAttributes.email);
        expect(res.gender).toEqual(userAttributes.gender);
        expect(res.personalityType).not.toBeTruthy();
        expect(res.givenName).toEqual(userAttributes.given_name);
        expect(res.familyName).toEqual(userAttributes.family_name)
        expect(res.phoneNumber.trim()).toEqual(userAttributes.phone_number);
        expect(res.ethnicity).toEqual(userAttributes.ethnicity)
        expect(res.dob).toEqual(userAttributes.birthdate);
        expect(res.locale.trim()).toBeTruthy();
    })
})

/*
attributes.given_name || null,
            attributes.family_name || null,
            attributes.email || null,
            attributes.phone_number || null,
            attributes.gender || null,
            attributes.ethnicity || null,
            attributes.birthdate || null,
            attributes.locale || null
*/