
import express from 'express'

import { authAdmin } from '../../middlewares/authAdmin.js';
import { addAdmin, adminLogin, adminLogout, adminUpdate, checkAdmin } from '../../controllers/adminController.js';

const router = express.Router()

router.get('/test',authAdmin,(req,res)=>{ res.send('This is a test request')})

router.post('/add',addAdmin)
router.post('/login',adminLogin)
router.post('/logout',adminLogout)
router.patch('/update',authAdmin,adminUpdate)


// For front end
router.get("/check-admin", authAdmin,checkAdmin);

export default router




