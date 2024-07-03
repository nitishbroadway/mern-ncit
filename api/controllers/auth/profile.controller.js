const { errorMsg, validationError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require('bcryptjs')

class ProfileCtrl {
    details = async (req, res, next) => {
        res.send(req.user)
    }
    
    update = async (req, res, next) => {
        try {
            const { name, phone, address } = req.body

            await User.findByIdAndUpdate(req.user._id, {name, phone, address})

            res.send({
                message: 'Profile updated'
            })
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    password = async (req, res, next) => {
        try {
            const { oldPassword, newPassword, confirmPassword } = req.body

           const user = await User.findById(req.user._id).select('+password')

            if (bcrypt.compareSync(oldPassword, user.password)) {
                if (newPassword == confirmPassword) {
                    const hash = bcrypt.hashSync(newPassword, 10);

                    await User.findByIdAndUpdate(user._id, {password: hash})

                    res.send({
                        message: 'Password updated'
                    })
                } else {
                    validationError(next, 'newPassword', 'The password is not confirmed')
                }
            } else {
                validationError(next, 'password', 'Old Password is incorrect')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new ProfileCtrl