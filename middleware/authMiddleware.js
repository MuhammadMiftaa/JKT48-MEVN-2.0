import jwt from "jsonwebtoken";
import User from "../model/user.js";

export const authMiddleware = async (req, res, next) => {
    let token
    token = req.cookies.jwt

    if (!token) {
        return next(
            res.status(401).json({
                message: "Access denied. Please contact the administrator for assistance."
            })
        )
    }

    let decoded
    try {
        decoded = await jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return next(
            res.status(401).json({
                message: "Invalid authentication token. Please log in again."
            })
        )
    }

    const currentUser = await User.findById(decoded.id)
    if (!currentUser) {
        return next(
            res.status(401).json({
                message: "Oops! We couldn't find the requested your data."
            })
        )
    }

    req.user = currentUser 
    next()
}

export const permissionMiddleware = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(res.status(403).json({
                message: "Access to this resource on the server is denied."
            }))
        }

        next()
    }
}