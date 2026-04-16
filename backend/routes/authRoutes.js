import express from 'express'
import {registration} from '../controllers/authController.js'

// creating router
const router = express.Router()

// handling diff req for auth module
router.post('/registration', registration)

export default router;