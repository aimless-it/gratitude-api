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
    event.body = {
        query: {},
        meta: {},
        user: {
            username
        },
        
    }
    event.result = {
        statusCode: 200,
        headers: {
            'Access-Origin-Accept-Headers': '*',
            'Access-Origin-Accept-Origin': '*',
            'Access-Origin-Accept-Methods': '*',
            'Content-Type': 'application/json'
        },
    }
    return event;
}