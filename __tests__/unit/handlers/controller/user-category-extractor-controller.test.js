const {userCategoryController} = require('../../../../src/handlers/').handlers

describe('it should return the proper construction of object when ', () => {

it('it is given proper parameters', async () => {
    const user = {
        category: 'testCategory',
        username: 'testUsername'
    }

    const event = {
        httpMethod: 'POST',
        pathParameters: user
    };

    const res = await userCategoryController(event)
    expect(res).toEqual({
        user,
        meta:{},
        query:{}
    })
})
})