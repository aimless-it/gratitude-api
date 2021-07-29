const {Client} = require('pg')
const client = new Client()

/*
expected body:
    {
        user: {
            username: String,
            category: String
        }
    }
*/
/**
 *  Removes a category from the list of subscribed categories for a user
 * @param event 
 * @param context 
 * @returns An array of Strings representing the categories for a user.
 */
exports.handler = async (event, context) => {
    await client.connect();
    const { user } = JSON.parse(event.body);
    const query = {
        text: "select removeCategoryFromUserPreferences($1, $2)",
        values: [user.username, user.category],
        rowMode: 'array'
    }
    try{
        await client.query('BEGIN');
        const res = await client.query(query)
        await client.query(process.env.NODE_ENV === 'prod' ? 'COMMIT' : 'ROLLBACK');
        const arr = [];
        for (const row of res.rows) {
            arr.push(...row)
        }
        return arr;
    } finally {
        client.end();
    }
}