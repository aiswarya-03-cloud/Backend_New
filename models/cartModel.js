


// import mongoose from 'mongoose';


// const { Schema } = mongoose;

// const cartSchema = new Schema({
//     user: {
//         type: Schema.Types.ObjectId,
//         ref: 'User',
//         required: true
//     },
//     restaurant: {
//         type: Schema.Types.ObjectId,
//         ref: 'Restaurant'
//     },
//     items: [
//         {
//             dish: {
//                 type: Schema.Types.ObjectId,
//                 ref: 'Dish',
//                 required: true
//             },
//             quantity: {
//                 type: Number,
//                 required: true,
//                 min: 1
//             },
//             price: {
//                 type: Number,
//                 required: true
//             }
//         }
//     ],
//     subtotal: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     tax: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     total: {
//         type: Number,
//         required: true,
//         default: 0.0
//     },
//     status: {
//         type: String,
//         enum: ['active', 'ordered', 'cancelled', null ],
//         default: 'active'
//     },
//     PaymentId: {
//         type: String
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now
//     },
//     updatedAt: {
//         type: Date,
//         default: Date.now
//     }
// });

// // Pre-save hook to calculate subtotal, tax, and total
// cartSchema.pre('save', function (next) {
//     this.subtotal = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     this.tax = this.subtotal * 0.1; // Assuming a 10% tax rate
//     this.total = this.subtotal + this.tax;
//     this.updatedAt = Date.now(); // Update the last modification date
//     next();
// });

// export const Cart = mongoose.model('Cart', cartSchema);





import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  menuItem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Menu", // Assuming you have a MenuItem model
    required: true
  },
  // name: { type: String, required: true },
  //veg: { type: Boolean, default: true },
  price: { type: Number, required: true },
  image: { type: String }, 
  quantity: { type: Number,required:true,default:1}, 
  // total: { type: Number, required: true }
});

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  restaurant: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    name: { type: String },
    location: { type: String }
  },
  cartItems: [cartItemSchema],
  totalPrice: { type: Number, required: true, default: 0 }, 
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// 🔹 Method to calculate total price
cartSchema.methods.calculateTotalPrice = function () {
  this.totalPrice = this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// 🔹 Pre-save hook to auto-update total price before saving
cartSchema.pre("save", function (next) {
  this.calculateTotalPrice();
  next();
});


export const Cart = mongoose.model("Cart", cartSchema);