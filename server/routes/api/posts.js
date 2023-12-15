import express from 'express'
import {
  getFeedPosts,
  getUserPosts,
  likePost,
} from '../../controllers/posts.js'
import { protect } from '../../middleware/auth.js'

const router = express.Router()

router.get('/', protect, getFeedPosts)
router.get('/:userId/posts', protect, getUserPosts)
router.patch('/:id/like', protect, likePost)

export default router
