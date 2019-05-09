const {User} = require('../models')

module.exports = {
    async register (req, res) {
        try{
            const user = await User.create(req.body)
            console.log(user);
            console.log('123111')
            res.send(user.toJSON())
        }catch(err){
            res.status(400).send({
                error: 'This email account is already in use'
            })
        }
        //email already exists
/*         res.send({
            message: `Hello ${req.body.email}!,Your user was register! Have fun!`
        }) */
    }
}