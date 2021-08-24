


exports.handler = (event, context, callback) => {
    const {result} = event;
    console.error(`State machine ended with result: ${JSON.stringify(result)}`);
    // return {
    //     statusCode: result.status,
    //     reason: result.reason
    // }
    callback(result.reason, result.status)
}