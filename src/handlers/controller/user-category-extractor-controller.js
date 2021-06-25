/* 
expected request:
    uri: /
    method: DELETE/PUT/POST
    body: {
        username: String,
        category: String
    }
*/
/**
 * Extracts the username and category out of the body
 *       and continues to the next step in the state machine.
 * @param event 
 * @param context 
 * @returns The body for the next lambda
 */
exports.handler = async (event, context) => {
    const {username, category} = event.body;
    return {
        query: {},
        meta: {},
        user: {
            username,
            category
        }
    }
}