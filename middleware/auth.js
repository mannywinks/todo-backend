import jwt from "jsonwebtoken"

const auth = (req, res , next) => {
    const token = req.headers.authorization
    
    if (!token) {
        return res.status(401).json({ message: "No token"})
    }
    
    try {
        const decoded = jwt.verify(token, "secretkey")
        req.userId = decoded.userId
        next()
    } catch (err) {
        res.status(401).json({ message: "invalid token"})
 }
}

export default auth
