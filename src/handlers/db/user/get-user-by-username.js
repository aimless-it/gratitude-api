const { Client } = require('pg')
const client = new Client()

/* 
expected body:
    {
        user: {
            username: String
        }
    }
 */
/**
 * Retrieves a user's information given the username
 * @param event 
 * @param context 
 * @returns a complete object of the users information
 */
exports.handler = async (event, context) => {
    await client.connect()

    const { user } = JSON.parse(event.body)
    const query = {
        text: "select * from compliment_user u join personality_type p on u.personality_type_id = p.id where u.username=$1 ",
        values: [user.username]
    }
    try {
        const res = await client.query(query);
        const { username, given_name, family_name, email, phone_number, gender, ethnicity, dob, locale, sensing, judging, introversion, feeling } = res.rows[0];
        return {
            username,
            givenName: given_name,
            familyName: family_name,
            email,
            phoneNumber: phone_number,
            gender,
            ethnicity,
            dob,
            locale,
            personalityType: {
                sensing,
                introversion,
                judging,
                feeling
            }
        }
    } finally {
        client.end();
    }
}