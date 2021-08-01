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
 * Retrieves a user's information given the username
 * @param event 
 * @param context 
 * @returns a complete object of the users information
 */
exports.handler = async (event, context) => {

    const { user } = event.body;
    const query = {
        text: "select * from compliment_user u join personality_type p on u.personality_type_id = p.id where u.username=$1 ",
        values: [user.username]
    }
    const res = await pool().query(query);
    const { username, given_name, family_name, email, phone_number, gender, ethnicity, dob, locale, sensing, judging, introversion, feeling } = res.rows[0];
    event.result.body = {
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
    return event;
}