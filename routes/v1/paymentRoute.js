import express from "express"
//import { createPayment, getUserOrders } from "../../controllers/paymentController.js"
import { authUser } from "../../middlewares/authUser.js"
import { createPayment } from "../../controllers/paymentController.js"
import { getPayment } from "../../controllers/paymentController.js"



const router = express.Router()

//router.route('/create-razorpay-order').post(authUser, createPayment)
// router.route('/get-user-orders').get(authUser, getUserOrders)
router.post("/create-checkout-session",authUser,createPayment)
router.get("/session-status",authUser,getPayment)


export default router

