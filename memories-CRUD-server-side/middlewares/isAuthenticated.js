const jwt = require("jsonwebtoken");

async function isAuth(req, res, next) {
    try {
        let token = req.headers.authorization
        if (!token) {
            return res.status(400).json({ message: "No token found in the headers" })
        }
        token = token.split(" ")[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET)
        req.userId = decoded.id
        next()
    } catch (error) {
        return res.status(400).json({ message: "Invalid token", error: error})
    }
}

module.exports = isAuth