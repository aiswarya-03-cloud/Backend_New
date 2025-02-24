

// import express from "express";
// import { addToCart, cancelStatus, checkoutCart,getActiveCart, getCart, reOrder, updateCart } from "../../controllers/cartController.js";
// import { authUser } from '../../middlewares/authUser.js'
// const router = express.Router()

// router.post('/add',addToCart);
// router.get('/get',authUser,getCart);
// router.post('/checkout',authUser,checkoutCart)
// router.get('/active',authUser,getActiveCart)
// router.put('/update',authUser,updateCart)
// router.put('/cancel/:orderId',authUser,cancelStatus)
// router.post('/reorder/:orderId',authUser,reOrder)


// export default router



import express from "express"
//import { authUser } from "../middlewares/authUser.js"
// import { clearCart, getCart, updateCart } from "../../controllers/cartController.js"
import { addToCart} from "../../controllers/cartController.js";
import { authUser } from "../../middlewares/authUser.js"
import {getCart}  from "../../controllers/cartController.js";
import {removeFromCart}  from "../../controllers/cartController.js";

const router = express.Router()

// router.route('/update').post(authUser, updateCart)
router.delete('/remove-from-cart',authUser,removeFromCart)
 router.get('/getcart',authUser,getCart);
 router.post('/add',authUser,addToCart);
 router.post('/add',authUser,addToCart);
// router.route('/').get(authUser, getCart)
// router.route('/clear').post(authUser, clearCart)

export default router


