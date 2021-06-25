const {Client} = require('pg')
const client = new Client()

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
    await client.connect()

    const {personalityType, category} = JSON.parse(event.body).query;

    const query = {
        text: "select getComplimentByInformation($1. $2, $3, $4, $5)",
        values: [personalityType.sensing, personalityType.introversion, personalityType.feeling, personalityType.judging, category],
    }

    const res = await client.query(query);
    return res.rows[0].compliment;
}