const personalityController = require('./handlers/controller/personality-extractor-controller').handler;
const usernameController = require('./handlers/controller/username-extractor-controller').handler;
const userCategoryController = require('./handlers/controller/user-category-extractor-controller').handler;
const getCategoryFunction = require('./handlers/db/category/get-categories-for-user').handler;
const removeCategoryFunction = require('./handlers/db/category/remove-category-from-user-prefs').handler;
const subscribeCategoryFunction = require('./handlers/db/category/subscribe-user-to-category').handler;
const getUserComplimentFunction = require('./handlers/db/compliments/get-compliment').handler
const getComplimentFunction = require('./handlers/db/compliments/get-compliment-by-category-personality').handler;
const UserCreationTrigger = require('./handlers/db/triggers/create-user-cognito-trigger').handler;
const getUserFunction = require('./handlers/db/user/get-user-by-username').handler;
const updateUserFunction = require('./handlers/db/user/update-user-by-username').handler;


module.exports.handlers = {
    personalityController,
    usernameController,
    userCategoryController,
    getCategoryFunction,
    removeCategoryFunction,
    subscribeCategoryFunction,
    getComplimentFunction,
    getUserComplimentFunction,
    UserCreationTrigger,
    getUserFunction,
    updateUserFunction
}