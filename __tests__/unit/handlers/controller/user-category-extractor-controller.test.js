const {userCategoryController} = require('../../../../src/').handlers

describe('it should return the proper construction of object when ', () => {

it('it is given proper parameters', async () => {
    const event = {
        httpMethod: 'POST',
        category: 'testCategory',
        username: 'testUsername'
    }


    const res = await userCategoryController(event)
    expect(res.body).toEqual({
        user:{
            username: event.username,
            category: event.category
        },
        meta:{},
        query:{}
    })
})
})