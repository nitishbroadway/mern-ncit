class ProfileCtrl {
    details = async (req, res, next) => {
        res.send('ok')
    }
    
    update = async (req, res, next) => {}
    
    password = async (req, res, next) => {}
}

module.exports = new ProfileCtrl