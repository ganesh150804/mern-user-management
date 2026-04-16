import express from 'express'
import {registration,login} from '../controllers/authController.js'

// creating router
const router = express.Router()

// handling diff req for auth module
router.post('/registration', registration)

router.post('/login', login)


export default router;