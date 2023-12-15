import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User.js'

// @desc: Register a new user
// @route: POST /api/auth/register
// @access: Public
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picture,
      friendList,
      location,
      bio,
    } = req.body

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picture,
      friendList,
      location,
      bio,
      viewCount: Math.floor(Math.random() * 10000),
      impressions: Math.floor(Math.random() * 10000),
    })

    const createdUser = await user.save()

    res.status(201).json(createdUser)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// @desc: Authenticate a user
// @route: POST /api/auth/login
// @access: Public
export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email: email })

    if (!user) {
      res.status(404).json({ message: 'User not found' })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password
    res.status(200).json({ user, token })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
