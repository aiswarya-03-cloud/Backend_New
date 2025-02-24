// import mongoose from 'mongoose';

// const { Schema } = mongoose;


// const menuItemSchema = new Schema({
//   name:{
//     type: String,
    
//   },
//   description: {
//     type: String
//   },
//   restaurant: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Restaurant'
//   }],
// dish: [{
//   type: Schema.Types.ObjectId,
//   ref: 'Dish'
// }],
// image: {
//   type: String,
//   default: "https://res.cloudinary.com/aw96/image/upload/v1723921863/00-fyt-food-website/plceholder%20dish%20icon.jpg"
// }
// });

// export const MenuItem = mongoose.model('MenuItem', menuItemSchema);




import mongoose from "mongoose"

const menuItemSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    quantity: {type: Number,required: true},
    restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true},
    image: {type: String}, //Cloudinary Image URL
    availability: {type: Boolean, default: true}
    },
    {timestamps: true}
)

export const Menu = mongoose.model('Menu', menuItemSchema)