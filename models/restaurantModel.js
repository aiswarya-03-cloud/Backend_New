// import mongoose from 'mongoose';
// const { Schema } = mongoose;

// const restaurantSchema = new Schema({

// name:{
//   type:String,
//   required: true
// },
// cuisine: {
//   type:String,
//   required:true
// },
// location: {
//   type: String,
//   required: true
// },
// phone: {
//   type: String,
//   maxLength: 20
// },
// rating: {
//   type: Number,
//   min: 0,
//   max: 5
// },
// image: {
//   type: String,
//   default: "https://res.cloudinary.com/aw96/image/upload/v1723441019/10047397_z9rayn.jpg"
// },
// menuItems:[{
//   type: Schema.Types.ObjectId,
//   ref: 'MenuItem',
//   required: true
// }]
// })

// export const Restaurant = mongoose.model('Restaurant', restaurantSchema);



import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    available: { type: Boolean, default: true },
    //veg: { type: Boolean, default: true },
   // recommended: { type: Boolean, default: true },
    category: { type: String },     
    image1: { type: String },
   // image2: { type: String },
    restaurantName: {type: String},
    restaurantLocation: {type: String},
});

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    image: {
         type: String,
         default: "https://res.cloudinary.com/aw96/image/upload/v1723441019/10047397_z9rayn.jpg"
       },
    menuItems: [menuItemSchema]
    },
    { timestamps: true }
)

export const Restaurant = mongoose.model('Restaurant', restaurantSchema)