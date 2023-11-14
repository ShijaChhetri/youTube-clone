const { verifyToken } = require("./jwt");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    try{
        if(token){
            const decoded = verifyToken(token);
            req.user = decoded;
    
            next();
        } else {
            res.status(401).json({message: 'Unauthorized user'})
        }
    } catch(error){
        console.log(error.code, error.message);
        res.status(401).json({message: error.message})
    }
    
}

module.exports = authMiddleware;