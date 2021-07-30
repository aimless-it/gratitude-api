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
    const { user } = JSON.parse(event.body);
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
    };
    try {
        await client.query('BEGIN')
        const res = await client.query(query)
        await client.query(process.env.NODE_ENV === 'prod' ? 'COMMIT' : 'ROLLBACK')
        const { given_name : givenName, family_name : familyName, email, phone_number : phoneNumber, ethnicity, dob, locale, gender} = res.rows[0];
        event.result.data = { 
            username: user.username,
            givenName,
            familyName,
            email,
            phoneNumber,
            ethnicity,
            dob,
            locale,
            gender

        };
    } finally {
        client.end()
    }
    return event;
}