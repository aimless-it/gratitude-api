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
    console.log(`it has entered the username controller and the event is: ${JSON.stringify(event)}`)
    const { username } = event;
    try {
        if(!username){
            throw new Error(`Attribute provided is undefined: ${JSON.stringify({username, event})}`)
        }
        event.body = {
            query: {},
            meta: {},
            user: {
                username
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
            status: 400
        };
        return event;
    }
    
}