const {personalityController} = require('../../../../src/').handlers

describe('it should return the proper construction of object when ', () => {
    it('it is given proper parameters', async () => {
        const personalityType = {
            feeling: 'testFeeling',
            introversion: 'testIntroversion',
            judging: 'testJudging',
            sensing: 'testSensing'
        };
        const category = {
            category: 'testCategory'
        }
        const event = {
            httpMethod: 'GET',
            pathParameters: category,
            queryStringParameters: personalityType
        }
        const res = await personalityController(event);
        expect(res).toEqual({
            query: {
                category: category.category,
                personalityType
            },
            meta:{},
            user: {}
        })
    })
})