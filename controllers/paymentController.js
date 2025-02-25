// import Razorpay from 'razorpay'
// import { Order } from '../models/orderModel.js'
// import { Restaurant } from '../models/restaurantModel.js';

// export const createPayment = async (req, res) => {
//   try {

//     const { menuItems, totalPrice, deliveryFee, taxRate, grandTotal, restaurant, customerName, customerAddress } = req.body

//     const instance = new Razorpay({
//       key_id: process.env.RAZORPAY_KEY_ID,
//       key_secret: process.env.RAZORPAY_KEY_SECRET,
//     });

//     const options = {
//       amount: Math.round(grandTotal * 100), // Amount in paise
//       currency: "INR",
//       receipt: `receipt_order_${Date.now()}`,
//     };

//     const order = await instance.orders.create(options)
    
//     //fetch restaurant
//     const restaurantData = await Restaurant.findById(restaurant).populate('name location')

//     // Save the order details to the database
//     const newOrder = new Order({
//       orderId: order.id,
//       userId: req.user.id,
//       menuItems,
//       restaurant: restaurantData,
//       totalPrice,
//       deliveryFee,
//       grandTotal,
//       taxRate,
//       customerName: customerName || req.user.name,
//       customerAddress,
//       receipt: order.receipt,  
//     })

//     await newOrder.save()
//     console.log(newOrder);

//     res.status(200).json({ orderId: order.id })
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error)
//     res.status(500).json({  error })
//   }
// }

// export const getUserOrders = async (req, res) => {
//   try {
//     const fetchedUserId = req.user.id

//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 5;
//     const skip = (page - 1) * limit;

//     // Fetch orders from the database where the user is the owner
//     const orders = await Order.find({ userId: fetchedUserId })
//       .populate('menuItems')
//       .populate('restaurant')
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit)
//       .exec();
//     // Get the total number of orders for the user
//     const totalOrders = await Order.countDocuments({ userId: fetchedUserId }); 

//     if (!totalOrders || totalOrders.length === 0) {
//       return res.status(404).json({ message: "No orders found for this user." });
//     }
    
//     // Return orders with pagination details
//     res.status(200).json({
//       success: true,
//       currentPage: page,
//       totalPages: Math.ceil(totalOrders / limit), // Calculate the total number of pages
//       totalOrders,
//       orders: orders.map(order => ({
//         orderId: order._id,
//         status: order.status,
//         restaurant: {
//           name: order.restaurant ? order.restaurant.name : "Unknown",
//           location: order.restaurant ? order.restaurant.location : "Unknown",
//         },
//         menuItems: order.menuItems.map(item => ({
//           name: item.name,
//           price: item.price,
//           quantity: item.quantity,
//           image: item.image,
//           veg: item.veg,
//           id: item.id
//         })),
//         grandTotal: order.grandTotal,
//         deliveryFee: order.deliveryFee,
//         taxRate: order.taxRate,
//         createdAt: order.createdAt,
//         paymentMethod: order.paymentMethod // If payment method (e.g., Razorpay) is saved
//       }))
//     });


//   } catch (error) {
//     console.error("Error fetching user orders:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// }; 
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const client_domain = process.env.CLIENT_DOMAIN 
import { Order } from "../models/orderPaymentModel.js";



export const createPayment = async (req, res,next) => {

    try{
    
    const user = req.user.userId;
    const {menuItems} = req.body;
    console.log("MenuItems Payment---",menuItems)


    // Validate menuItems
    if (!menuItems || menuItems.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
      }

    const lineItems = menuItems.map((menuItem) => {

        console.log("MenuItem Name--",menuItem.menuItem.name)
        console.log("MenuItem Price--",menuItem.price)
        console.log("MenuItem Quantity--",menuItem.quantity)
        console.log("MenuItem Image--",menuItem.menuItem.image)


        if (!menuItem.menuItem.name || !menuItem.price || !menuItem.quantity) {
            throw new Error("Invalid menu item data");
          }

          
        
        return{
          
            
            price_data: {
                currency: "inr",
                product_data: {
                    name: menuItem?.menuItem?.name,
                    images: [menuItem?.menuItem?.image]
                    
                },
                unit_amount: Math.round(menuItem?.price * 100),
                
            },
            quantity: menuItem?.quantity,

        }
        
     
    
    });

   

    // A request is sent to stripe website to create a session
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: lineItems,
        mode: "payment",
        success_url: `${client_domain}/user/payment/success`,
        cancel_url: `${client_domain}/user/payment/cancel`,
    });

    const newOrder = new Order({ user, sessionId: session?.id });
    await newOrder.save()

    res.json({ success: true, sessionId: session.id });

    }catch(error){
    return res.status(error.statuscode || 500).json({message: error.message || "Internal server error"});

    }
}

    export const getPayment = async (req, res,next) => {
   
    
        try {
            const sessionId = req.query.session_id;
            const session = await stripe.checkout.sessions.retrieve(sessionId);
    
            console.log("session=====", session);
    
            res.send({
                status: session?.status,
                customer_email: session?.customer_details?.email,
                session_data: session,
            });
        } catch (error) {
            res.status(error?.statusCode || 500).json(error.message || "internal server error"); 
        }
    };
    

