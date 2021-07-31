const pool = require('../config')
/* 
expected body:
    {
        query: {
            personalityType: {
                sensing: String,
                introversion: String,
                feeling: String,
                judging: String
            },
            category: String
        }
    }
*/
/**
 * Retrieves a random compliment from the database given the personality type and 
 *      a category.
 * @param event 
 * @param context 
 * @returns 
 */
exports.handler = async (event, context) => {

    const { personalityType, category } = event.body.query;

    const query = {
        text: "select getComplimentByInformation($1, $2, $3, $4, $5)",
        values: [personalityType.sensing, personalityType.introversion, personalityType.feeling, personalityType.judging, category],
        rowMode: 'array'
    }
    const res = await pool.query(query);
    event.result.body = {
        compliment: res.rows[0][0]
    }
    return event;
}