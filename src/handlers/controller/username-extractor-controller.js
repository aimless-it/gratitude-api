/* 
expected request:
    uri: /:username
    method: GET
    body: null
*/
/**
 * Extracts the username out of the path and continues to the next
 *      step in the state machine.
 * @param event 
 * @param context 
 * @returns The body for the next lambda
 */
exports.handler = async (event, context) => {
    const {username} = event.pathParameters;
    return {
        query:{},
        meta: {},
        user: {
            username
        }
    }
}