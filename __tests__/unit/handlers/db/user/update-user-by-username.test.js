require('dotenv').config()
const {updateUserFunction} = require('../../../../../src/handlers').handlers

describe('It should update and return the user information ', () => {
    it('when it is given the correct input', async () => {
        const user = {
            username: 'testUser1',
            givenName: 'given1',
            familyName: 'family1',
            email: null,
            phoneNumber: '1234567890',
            gender: null,
            ethnicity: 'indian',
            dob: new Date(1988, 10, 17),
            locale: null
        };
        const event = {
            body: JSON.stringify({
                user,
                meta: {},
                query: {}
            })
        };
        const res = await updateUserFunction(event);
        expect(res.username).toEqual(user.username);
        expect(res.locale.trim()).toEqual('EN-US');
        expect(res.email).toEqual('user1@email.com')
        expect(res.phoneNumber.trim()).toEqual(user.phoneNumber)
        expect(res.gender).toEqual('m')
        expect(res.ethnicity).toEqual('indian')
        expect(res.dob).toEqual(user.dob)
        expect(res.givenName).toEqual(user.givenName)
        expect(res.familyName).toEqual(user.familyName)

    })
})