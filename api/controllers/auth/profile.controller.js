const { errorMsg } = require("../../lib")
const { User } = require("../../models")

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
    
    password = async (req, res, next) => {}
}

module.exports = new ProfileCtrl