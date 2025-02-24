

import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50,
    },
    email:{
        type: String,
        unique: true, // Make sure that email is not a copy OR same email is not present 
        required: true,  // Make sure to fill this field & do not leave as blank
        minLength: 3,
        maxLength: 30,
    },
    password:{
        type: String,
        required: true
        
    },
    profilePic : {
        type: String,
        default:"https://res.cloudinary.com/aw96/image/upload/v1723441019/10047397_z9rayn.jpg"
    },
    phone: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean, // If Account is true, then Account is Active . If Account is false, then account is not active or it is deleted
        default: true,
    }
    
    // cartData : {
    //         type: Object,
    //         default: {}
    //     }, 
    //     {minimize:false}
    
    });
    




export const User = mongoose.model("User",userSchema);






