const { Client } = require('pg')
const client = new Client()

/*
    expected body:
        {
            user: {
                username: String,
                givenName: String,
                familyName: String,
                email: String,
                gender: String,
                ethnicity: String,
                dob: String(date),
                locale: String
            }
        }
*/
/**
 * Updates a user in the db, given the username. nulls and empty strings will be ignored and original values will be kept.
 * @param event 
 * @param context 
 * @returns The newly updated object in the db
 */
module.exports.handler = async (event, context) => {
    await client.connect();
    const { user } = JSON.parse(event).body;
    const query = {
        text: "select * from updateUserByUsername($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        values: [
            user.username,
            user.givenName || null,
            user.familyName || null,
            user.email || null,
            user.phoneNumber || null,
            user.gender || null,
            user.ethnicity || null,
            user.dob || null,
            user.locale || null
        ],
        rowMode: 'array'
    };
    const res = client.query(query)
    const { givenName, familyName, email, phoneNumber, ethnicity, dob, locale } = res.rows[0];
    return {
        username: user.username,
        givenName,
        familyName,
        email,
        phoneNumber,
        ethnicity,
        dob,
        locale

    };
}