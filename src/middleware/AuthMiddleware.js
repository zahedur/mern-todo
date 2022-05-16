const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    let token = req.headers['token'];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) =>{
        if (err){
            res.status(401).json({ status: false, message: 'Unauthorized'});
        }else{

            // Get user name from decoded token and add with req header
            req.headers.user = decoded['data'];
            next()
        }
    })
}
