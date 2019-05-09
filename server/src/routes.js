const AuthenticationController = require('./controllers/AuthenticationController')

const AuthenticationControllerPolicy = require('./policies/AuthenticationControllerPolicy')

const RecipeBoxController = require('./controllers/RecipeBoxController')

module.exports = (app) => {
    app.post('/register',
        AuthenticationControllerPolicy.register,
        AuthenticationController.register)
    app.post('/newRecipe',
        RecipeBoxController.add)
    app.post('/refreshRecipe',
        RecipeBoxController.refresh)
    app.post('/deleteRecipe',
        RecipeBoxController.delete)
}