// import mongoose from 'mongoose';

// const menuItemSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   quantity: Number,
//   image: String,
//   veg: Boolean,
// });

// const orderSchema = new mongoose.Schema({
//   razorpayOrderId: {
//     type: String,
//   },
//   menuItems: [menuItemSchema], // Include menuItems in the order
//   totalPrice: {
//     type: Number,
//   },
//   userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
//   restaurant: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Restaurant'
//   },
//   deliveryFee: {
//     type: Number,
//   },
//   taxRate: {
//     type: Number,
//   },
//   grandTotal: {
//     type: Number,
//   },
//   status: {
//     type: String,
//     default: 'completed', // Order status can be 'pending', 'paid', etc.
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now,
//   },
// });

// export const Order = mongoose.model('Order', orderSchema);



