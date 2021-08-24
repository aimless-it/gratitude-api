/* 
expected request:
    uri: /:username/:category
    method: DELETE/PUT/POST
*/
/**
 * Extracts the username and category out of the body
 *       and continues to the next step in the state machine.
 * @param event 
 * @param context 
 * @returns The body for the next lambda
 */
exports.handler = async (event, context) => {
    const {username, category} = event;
    try {
        if(!username || !category){
            throw new Error(`Attribute provided is undefined: ${JSON.stringify({username, category, event})}`)
        }
        event.body = {
            query: {},
            meta: {},
            user: {
                username,
                category
            },
            
        }
        event.result = {
        }
        return event;
    }catch (err) {
        event.result = {
            fail: true,
            error: err.message,
            reason: 'Client provided invalid parameters',
            statusCode: 400
        };
        return event;
    }
    
}