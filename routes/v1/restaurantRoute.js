

// import express from 'express'
// import { addRestaurant,getRestaurant,getAllRestaurants,deleteRestaurant,updateRestaurant } from '../../controllers/restaurantController.js';
// import { upload } from '../../middlewares/uploadFile.js';
// import {authAdmin} from '../../middlewares/authAdmin.js'
// import multer from 'multer';

// const router = express.Router()

// router.get('/test',(req,res)=>{ res.send('This is a test request')});

// router.post('/add',upload.single('image'), authAdmin,addRestaurant);
// router.get('/get/:id',getRestaurant)
// router.get('/all',getAllRestaurants)
// router.delete('/delete',authAdmin,deleteRestaurant)
// router.patch('/update/:id',upload.single('image'),authAdmin,updateRestaurant)



// export default router

// //upload.single('image')






import express from 'express'
//import { admin, authUser } from '../../middlewares/authMiddleware.js'
import { createRestaurant, deleteRestaurant, getRestaurant, getRestaurantById, getRestaurantByMenuItem, searchRestaurant, updateRestaurant } from '../../controllers/restaurantController.js'
//import { upload } from '../../middlewares/uploadMiddleware.js'
import { authUser } from '../../middlewares/authUser.js'
import { authAdmin } from '../../middlewares/authAdmin.js'
import { upload } from '../../middlewares/uploadFile.js'

const router = express.Router()

//Restaurant routes
router.post('/create', authUser, authAdmin, upload.fields([
        { name: 'image', maxCount: 1 },       
        { name: 'menuItems[0].image1', maxCount: 1 },
        { name: 'menuItems[0].image2', maxCount: 1 },
        { name: 'menuItems[1].image1', maxCount: 1 },
        { name: 'menuItems[1].image2', maxCount: 1 },
        { name: 'menuItems[2].image1', maxCount: 1 },
        { name: 'menuItems[2].image2', maxCount: 1 }
        ]), createRestaurant)
router.get('/all-restaurants', getRestaurant)
router.get('/:id', authUser, getRestaurantById)
router.get('/', authUser, getRestaurantByMenuItem)
router.put('/:id', authUser, authAdmin, upload.single('image'), updateRestaurant)
router.delete('/:id', authUser, authAdmin, deleteRestaurant)
router.get('/search/:id', authUser, searchRestaurant)


export default router

//upload.single('image')

// upload.fields([
//     { name: 'menuItems[0].image1', maxCount: 1 },
//     { name: 'menuItems[0].image2', maxCount: 1 },
//     { name: 'menuItems[1].image1', maxCount: 1 },
//     { name: 'menuItems[1].image2', maxCount: 1 },
//     { name: 'menuItems[2].image1', maxCount: 1 },
//     { name: 'menuItems[2].image2', maxCount: 1 }
//     ])


