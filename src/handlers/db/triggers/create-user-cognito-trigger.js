const {Client} = require('pg')
const client = new Client()

/*
expected body from cognito:
    {
        version: String,
        triggerSource: String,
        region: AWSRegion,
        userPoolId: String,
        userName: String,
        callerContext: {
            awsSdkVersion: String,
            clientId: String
        },
        request: {
            userAttributes: {
                [cognitoCustomAttributes: String]: String
            }
        },
        response: {}
    }
*/
/**
 * A trigger for when a new user signs up with cognito, it will 
 *      insert the user's information into the database.
 * @param event 
 * @param context 
 * @returns The event for cognito to continue auth flow.
 */
exports.handler = async (event, context) => {
    await client.connect();
    const body = JSON.parse(event.body);
    const attributes = body.request.userAttributes;
    const query = {
        text: `insert into compliment_user(username, given_name, family_name,
        email, phone_number, gender, ethnicity, dob, locale) values ($1, $2, 
        $3, $4, $5, $6, $7, $8, $9)`,
        values: [
            body.userName,
            attributes.given_name || null,
            attributes.family_name || null,
            attributes.email || null,
            attributes.phone_number || null,
            attributes.gender || null,
            attributes.ethnicity || null,
            attributes.birthdate || null,
            attributes.locale || null
        ]
    }

    try{
        await client.query('BEGIN')
        await client.query(query);
        await client.query('COMMIT');
    } catch(err) {
        console.error(`error saving to db on ${Date.now()}: ${err}`);
        
    }

    return event;
}

