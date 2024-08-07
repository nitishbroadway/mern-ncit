const jwt = require('jsonwebtoken')
const { User } = require('../models')
const multer = require('multer')

const validationError = (next, name, message) => {
    next({
        message: 'There seems to be some validation error',
        status: 422,
        errors: {
            [name]: message,
        }
    })
}

const errorMsg = (next, error) => {
    console.log(error)

    if ('errors' in error) {
        for (let k in error.errors) {
            validationError(next, k, error.errors[k].message)
        }
    } else if ('code' in error && error.code == 11000) {
        validationError(next, 'email', 'Given email is already in use')
    } else {
        next({
            message: 'Problem while processing request',
            status: 400
        })
    }
}

const auth = async (req, res, next) => {
    try {
        if('authorization' in req.headers) {
            const token = req.headers.authorization.split(' ').pop()

            const decoded = jwt.verify(token, process.env.JWT_TOKEN)

            const user = await User.findById(decoded.uid)

            if(user) {
                req.user = user

                next()
            } else {
                next({
                    message: 'Authentication token is invalid',
                    status: 401,
                })
            }
        } else {
            next({
                message: 'Authentication token is missing',
                status: 401,
            })
        }
    } catch(e) {
        next({
            message: 'Authentication token is invalid',
            status: 401,
        })
    }
}

const adminOnly = (req, res, next) => {
    if(req.user.role == 'Admin') {
        next()
    } else {
        next({
            message: 'Access denied',
            status: 403
        })
    }
}

const upload = () => multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/')
        },
        filename: (req, file, cb) => {
            const ext = file.originalname.split('.').pop()
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
            cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext)
        }
    }),
    fileFilter: (req, file, cb) => {
        if(file.mimetype.startsWith('image/')) {
            cb(null, true)
        } else {
            cb(new Error('File type not supported'))
        }
    }
})

module.exports = { validationError, errorMsg, auth, adminOnly, upload }