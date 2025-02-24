// import express from 'express'
// import { addMenuItem, deleteMenuItem, getAllMenuItems, getMenuItem,updateMenuItem } from '../../controllers/menuItemController.js';
// import { upload } from '../../middlewares/uploadFile.js';
// import {authAdmin}from '../../middlewares/authAdmin.js'
// const router = express.Router()


// router.get('/test',(req,res)=>{ res.send('This is a test request')});

// router.post('/add',authAdmin,addMenuItem);
// router.get('/get/:id',getMenuItem);
// router.get('/all',getAllMenuItems);
// router.patch('/update/:id',upload.single('image'),authAdmin,updateMenuItem);
// router.delete('/delete',authAdmin,deleteMenuItem);


// export default router




// upload.single('image')


import express from 'express'
//import { upload } from '../../middlewares/uploadMiddleware.js'
//import { admin, authUser } from '../../middlewares/authMiddleware.js'
import { createMenuItem, deleteMenuItem, getMenuItems, menuItemById, updateMenuItem } from '../../controllers/menuItemController.js'
import { upload } from '../../middlewares/uploadFile.js'
import { authUser } from '../../middlewares/authUser.js'
import { authAdmin } from '../../middlewares/authAdmin.js'

const router = express.Router()

router.post('/create/:restaurantId', authUser, authAdmin, upload.single('image'), createMenuItem)
router.get('/all-items/:restaurantId', getMenuItems)
router.get('/:id', authUser, menuItemById)
router.put('/:id', authUser, authAdmin, upload.single('image'), updateMenuItem)
router.delete('/:id', authUser, authAdmin, deleteMenuItem)

export default router




// upload.single('image')