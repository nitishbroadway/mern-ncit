const { validationError, errorMsg } = require("../../lib")
const bcrypt = require('bcryptjs')
const { User } = require('../../models')

class LoginCtrl {

    login = async (req, res, next) => {
        try {
            const { email, password } = req.body

            const user = await User.findOne({email}).select('+password')

            if(user) {
                if(bcrypt.compareSync(password, user.password)) {
                    res.send(user)
                } else {
                    validationError(next, 'password', 'Password is incorrect')
                }
            } else {
                validationError(next, 'email', 'Given email is not registered')
            }
        } catch(error) {
            errorMsg(next, error)
        }
    }

}

module.exports = new LoginCtrl