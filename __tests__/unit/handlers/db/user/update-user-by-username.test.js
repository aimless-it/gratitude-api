const mock = require('../mockDB')
const { updateUserFunction } = require('../../../../../src').handlers

describe('It should update and return the user information ', () => {
    beforeAll( () => {
        mock.mock();
    })
    afterAll( () => {
       return mock.done();
    })
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
            body: {
                user,
                meta: {},
                query: {}
            },
            result: {}
        };
        const { result } = await updateUserFunction(event);
        const { body: res } = result; 
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