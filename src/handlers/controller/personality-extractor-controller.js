/* 
expected request:
    uri: /:category?sensing=String&introversion=String&judging=String&feeling=String
    method: GET
    body: null
*/
/**
 * Extracts the category and personality type out of the path
 *       and continues to the next step in the state machine.
 * @param event 
 * @param context 
 * @returns The body for the next lambda
 */
exports.handler = async (event, context) => {
    const {category} = event.pathParameters;
    const {feeling, introversion, judging, sensing} = event.queryStringParameters;
    return {
        query: {
            category,
            personalityType: {
                sensing,
                introversion,
                feeling,
                judging
            }
        },
        meta: {},
        user: {},
        result: {
            statusCode: 200,
            headers: {
                'Access-Origin-Accept-Headers': '*',
                'Access-Origin-Accept-Origin':'*',
                'Access-Origin-Accept-Methods':'*',
                'Content-Type':'application/json'
            },
        }
    }
}