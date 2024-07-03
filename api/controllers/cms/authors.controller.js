const { errorMsg, validationError } = require("../../lib")
const { User } = require("../../models")
const bcrypt = require('bcryptjs')

class AuthorsCtrl {
    index = async (req, res, next) => {
        try {
            const authors = await User.find({role: 'Author'})

            res.send(authors)
        } catch(error) {
            errorMsg(next, error)
        }
    }
    
    store = async (req, res, next) => {
        try {
            const { name, email, password, confirmPassword, phone, address, status } = req.body

            if (password == confirmPassword) {
                const hash = bcrypt.hashSync(password, 10);

                await User.create({
                    name,
                    email,
                    password: hash,
                    phone,
                    address,
                    status
                })

                res.send({
                    message: 'Author added'
                })
            } else {
                validationError(next, 'password', 'The password is not confirmed')
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    show = async (req, res, next) => {
        try {
            const { id } = req.params

            const user = await User.findById(id)

            if(user) {
                res.send(user)
            } else {
                next({
                    message: 'User not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    update = async (req, res, next) => {
        try {
            const { name, phone, address, status } = req.body
            const { id } = req.params

            const user = await User.findById(id)

            if (user) {
                await User.findByIdAndUpdate(id, { name, phone, address, status })

                res.send({
                    message: 'Author updated'
                })
            } else {
                next({
                    message: 'User not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
    
    destroy = async (req, res, next) => {
        try {
            const { id } = req.params

            const user = await User.findById(id)

            if (user) {
                await User.findByIdAndDelete(user._id)

                res.send({
                    message: 'Author deleted'
                })
            } else {
                next({
                    message: 'User not found',
                    status: 404
                })
            }
        } catch (error) {
            errorMsg(next, error)
        }
    }
}

module.exports = new AuthorsCtrl