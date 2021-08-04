const {personalityController} = require('../../../../src/').handlers

describe('it should return the proper construction of object when ', () => {
    it('it is given proper parameters', async () => {
        const personalityType = {
            feeling: 'testFeeling',
            introversion: 'testIntroversion',
            judging: 'testJudging',
            sensing: 'testSensing'
        };
        const category = 'testCategory'
        const event = {
            httpMethod: 'GET',
            feeling: personalityType.feeling,
            introversion: personalityType.introversion,
            judging: personalityType.judging,
            sensing: personalityType.sensing,
            category
        }
        const res = await personalityController(event);
        expect(res.body).toEqual({
            query: {
                category: category,
                personalityType
            },
            meta:{},
            user: {},
        })
    })
})