const pool = require('../config')
/*
expected body:
    {
        user: {
            username: String
        }
    }
*/
/**
 * Gets the username out of the body of the request and
 *      queries the database for all categories the user
 *      has subscribed to.
 * @param  event 
 * @param  context 
 * @returns An array of Strings representing the categories for a user.
 */
exports.handler = async (event, context) => {
    const { user } = event.body;
    const query = {
        text: "select getAllCategoryByUsername($1)",
        values: [user.username],
        rowMode: 'array'
    };

    const res = await pool.query(query);
    const arr = [];
    for (const row of res.rows) {
        arr.push(...row);
    }
    event.result.body = {
        categories: arr
    }
    return event;
    
}