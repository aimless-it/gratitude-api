


exports.handler = async (event, context) => {
    const {result} = event;
    console.error(`State machine ended with result: ${result}`);
    return {
        statusCode: result.status,
        reason: result.reason
    }
}