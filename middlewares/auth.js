const jwt = require("jsonwebtoken");
// const config = require ("config")

function auth(req, res, next) {
         const token = req.header("x-auth-token");
         if (!token) {
                 return res.status(400).send("Access Denied. No token provided") 
         }
         try {
                  const decoded = jwt.verify(token, "jwtPrivateKey")
                  // const decoded = jwt.verify(token, config.get("jwtPrivateKey"))
                  req.user = decoded
                  next();
         }catch (error) {
                  return  res.status(400).send("Access Denied.........")
         }      
}

module.exports = auth;








// status code