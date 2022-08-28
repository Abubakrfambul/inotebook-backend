const jwt = require('jsonwebtoken')
const JWT_SECRET = 'krishna';

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json({error: 'please provide a valid token'})
    try{
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user;
        next();
    }
    catch(err) {

    }
   
}

module.exports = fetchUser;