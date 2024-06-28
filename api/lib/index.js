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

module.exports = { validationError, errorMsg }