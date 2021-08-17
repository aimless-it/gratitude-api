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
    try{
        const {feeling, introversion, judging, sensing, category} = event;
        for(let att of [feeling, introversion, judging, sensing, category]){
            if(!att){
                throw new Error(`Attribute provided is undefined: ${JSON.stringify({feeling, introversion, judging, sensing, category, event})}`)
            }
        }
        event.body = {
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
            
        }
        event.result = {
        }
        return event;
    } catch (err) {
        event.result = {
            fail: true,
            error: err.message,
            reason: 'Client provided invalid parameters',
            statusCode: 400
        };
        return event;
    }
    
}