import express from 'express'
import { RegisterUser, LoginUser, LogoutUser, GetUser } from '../controllers/authController.js'
import { authMiddleware, permissionMiddleware } from '../middleware/authMiddleware.js'

const router = express.Router()

router.post('/register', RegisterUser)
router.post('/login', LoginUser)
router.get('/logout', LogoutUser)
router.get('/getuser', authMiddleware, GetUser)
router.get('/admin', authMiddleware, permissionMiddleware('admin'), (req, res) => {
    res.send("You are logged in Admin User.")
})

export default router