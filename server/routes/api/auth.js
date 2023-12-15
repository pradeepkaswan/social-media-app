import express from 'express'
// import { protect } from '../middlewares/auth'
import { login } from '../../controllers/auth.js'

const router = express.Router()

router.post('/login', login)
// router.get('/me', protect, getUserProfile)

export default router
