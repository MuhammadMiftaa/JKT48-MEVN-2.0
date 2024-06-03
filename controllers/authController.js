import User from '../model/user.js'
import jwt from 'jsonwebtoken'
import asyncHandler from '../middleware/asyncHandler.js'

const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1y'
    })
}

const createSendToken = (user, statusCode, res) => {
    const token = signToken(user.id)

    const cookieOption = {
        expire: new Date(
            Date.now() + 360 * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        security: false
    }

    res.cookie('jwt', token, cookieOption)
    user.password = undefined

    res.status(statusCode).json({
        data: user
    })
}

export const RegisterUser = asyncHandler(async (req, res) => {
    const isAdministrator = (await User.countDocuments()) === 0

    const createUser = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: isAdministrator ? 'admin' : 'user'
    })

    createSendToken(createUser, '201', res)
})
export const LoginUser = asyncHandler(async(req, res) => {
    if(!req.body.email || !req.body.password){
        res.status(400)
        throw new Error("Email and Password above cannot blank.")
    }

    const userData = await User.findOne({
        email: req.body.email
    })
    if (userData && (await userData.comparePWD(req.body.password))){
        createSendToken(userData, '200', res)
    }
    else {
        res.status(400)
        throw new Error("User Invalid. Check your email or password.")}
})
export const LogoutUser = ((req, res) => {
    res.cookie('jwt', '', {
        expire: new Date(0),
        httpOnly: true,
        security: false
    })
    res.status(200).json({
        message: "Logout Successfull."
    })
})
export const GetUser = async(req, res) => {
    const user = await User.findById(req.user.id).select({password: 0})

    if(user){
        res.status(200).json({
            user
        })
    } else {
        res.status(401).json({
            message: "Oops! We couldn't find the requested your data."
        })
    }
}