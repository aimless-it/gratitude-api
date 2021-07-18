const personalityController = require('./controller/personality-extractor-controller').handler;
const usernameController = require('./controller/username-extractor-controller').handler;
const userCategoryController = require('./controller/user-category-extractor-controller').handler;
const getCategoryFunction = require('./db/category/get-categories-for-user').handler;
const removeCategoryFunction = require('./db/category/remove-category-from-user-prefs').handler;
const subscribeCategoryFunction = require('./db/category/subscribe-user-to-category').handler;
const getUserComplimentFunction = require('./db/compliments/get-compliment').handler
const getComplimentFunction = require('./db/compliments/get-compliment-by-category-personality').handler;
const UserCreationTrigger = require('./db/triggers/create-user-cognito-trigger').handler;
const getUserFunction = require('./db/user/get-user-by-username').handler;
const updateUserFunction = require('./db/user/update-user-by-username').handler;


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