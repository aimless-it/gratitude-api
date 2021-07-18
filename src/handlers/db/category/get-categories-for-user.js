const { Client } = require('pg');
const client = new Client();


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
    await client.connect();
    const { user } = JSON.parse(event.body);
    const query = {
        text: "select getAllCategoryByUsername($1)",
        values: [user.username],
        rowMode: 'array'
    };

    const res = await client.query(query);
    const arr = [];
    for (const row of res.rows) {
        arr.push(...row);
    }
    client.end();
    return arr;
}