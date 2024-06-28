const { validationError, errorMsg } = require("../../lib")
const bcrypt = require('bcryptjs')
const { User } = require('../../models')

class RegisterCtrl {

    register = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, phone, address } = req.body

            if(password == confirmPassword) {
                const hash = bcrypt.hashSync(password, 10);

                await User.create({
                    name,
                    email,
                    password: hash,
                    phone,
                    address,
                })

                res.send({
                    message: 'Thank you for registering'
                })
            } else {
                validationError(next, 'password', 'The password is not confirmed')
            }
        } catch(error) {
            errorMsg(next, error)
        }
    }

}

module.exports = new RegisterCtrl