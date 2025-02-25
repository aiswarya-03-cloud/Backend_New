import express from 'express'
import userRoute from './userRoute.js'
import adminRoute from './adminRoute.js'
import restaurantRoute from './restaurantRoute.js'
//import dishRoute from './dishRoute.js'
import menuItemRoute from './menuItemRoute.js'
import cartRoute from './cartRoute.js'
//import paymentRoute from './paymentRoute.js'
import couponRoute from './couponRoute.js'
//import razorpayRoute from './razorpayRoute.js'
//import orderRoute from './orderRoute.js'
import paymentRoute from './paymentRoute.js'
import foodRoute from './foodRoute.js'


const v1Router = express.Router()

v1Router.use('/user',userRoute)
v1Router.use('/admin',adminRoute)

 v1Router.use('/food', foodRoute)
v1Router.use('/restaurant', restaurantRoute)
// v1Router.use('/order', orderRoutes)
v1Router.use('/menuitem', menuItemRoute)
v1Router.use('/cart',cartRoute)
v1Router.use('/payment', paymentRoute)
 //v1Router.use('/order', orderRoute)
// v1Router.use('/payment',razorpayRoute)
v1Router.use('/coupon',couponRoute)




export default v1Router 


