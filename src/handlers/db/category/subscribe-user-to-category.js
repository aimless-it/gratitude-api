const { Client } = require('pg')
const client = new Client();
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
 * Adds a category to the users list of subscribed categories.
 * @param event 
 * @param context 
 * @returns An array of Strings representing the categories for a user.
 */
exports.handler = async (event, context) => {
    await client.connect();
    const { user } = event.body;
    const query = {
        text: "select addCategoryToUserPreferences($1, $2)",
        values: [user.username, user.category],
        rowMode: 'array'
    };

    try {
        client.query('BEGIN');
        const res = await client.query(query)
        await client.query(process.env.NODE_ENV === 'prod' ? 'COMMIT' : 'ROLLBACK');
        const arr = [];
        for (const row of res.rows) {
            arr.push(...row)
        }
        event.result.body = {
            compliments: arr
        }
    } finally {
        client.end();
    }
    return event;
}