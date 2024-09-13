import express from 'express'
import { LoginCR, RegisterCN,getUser,AddMember,GetMember } from '../controllers/authController.js';
import { IsSignin } from '../MiddelWare/MiddelWares.js';
import formidable from 'express-formidable'
const router = express.Router()

router.post("/register",RegisterCN);
router.post("/login",LoginCR);
router.get("/getUser",IsSignin,getUser);
router.post('/add-member',formidable(),AddMember)
router.get('/get-member',IsSignin,GetMember)

export default router