import dotenv from 'dotenv'
import express from 'express'
import bodyParser from 'body-parser'
import multer from 'multer'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js'
import { register } from './controllers/auth.js'
import { createPost } from './controllers/posts.js'
import { protect } from './middleware/auth.js'
import authRoutes from './routes/api/auth.js'
import userRoutes from './routes/api/users.js'
import postRoutes from './routes/api/posts.js'
import User from './models/User.js'
import Post from './models/Post.js'
import { users, posts } from './data/index.js'

// Global variables
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()

// Load env variables
dotenv.config()

// Connect to database
connectDB()

// Serve static files from the React app
app.use(express.static('dist'))

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(morgan('common'))
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/assets', express.static(path.join(__dirname, 'public/assets')))

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/assets')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  },
})

const upload = multer({ storage: storage })

// Routes
app.post('/api/auth/register', upload.single('picture'), register)
app.post('/api/posts', protect, upload.single('picture'), createPost)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

// Start server
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  // User.insertMany(users)
  // Post.insertMany(posts)
})
