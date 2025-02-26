import bcrypt from 'bcrypt'
import { User } from '../models/userModel.js';
import {generateUserToken } from '../utils/generateToken.js';
//import { generateUserToken } from '../utils/generateToken.js';
//import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js";
import validator from "validator";
const NODE_ENV = process.env.NODE_ENV;


export  const addUser = async (req, res, next) => {
 
    try {
        const {name,email,password,phone,profilePic} = req.body
         if (!name||!email||!password) {
         
           return res.status(401).json({success:false,message:"all field required"})
         }
       
         const userExist = await User.findOne({ email });
       
         if (userExist) {
           return res.status(200).json({ success: false, sameAccount:true, message: "user exist, Please login" });
       }
         const saltRounds = 10;
         const hashedPassword = bcrypt.hashSync(password, saltRounds);
       
         const newUser = new User({name,email,password:hashedPassword,phone,profilePic})
         await newUser.save()
       const userId = newUser._id
         const token = generateUserToken(email,userId)
         res.cookie('token',token,{
           sameSite: 'None',
           secure: true,
           httpOnly: true,
           path: '/',
           maxAge: 2 * 60 * 60 * 1000, // 2 hours in milliseconds
           
         })
         res.json({success:true,message:'user created successfully'})
       
       
         } catch (error) {
           res.status(error.status || 500).json({message: error.message || "internal server"})
         }
}

export const userSignup = async (req, res, next) => {
    try {
        console.log("hitted");

        const { name, email, password, phone, profilePic } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }


        
       // Validating email format & strong password 

       if(!validator.isEmail(email)){
        return res.json({success:false, message:"Please enter a valid email"})
    }

    if(password.length<8){

       return res.json({success:false, message: "Please enter a strong password"})  

    }


        const isUserExist = await User.findOne({ email });

        if (isUserExist) {
            return res.status(400).json({ message: "user already exist" });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const userData = new User({ name, email, password: hashedPassword, phone, profilePic });
        await userData.save();

        const token = generateUserToken(email,userData._id);
        console.log("UserId--",userData._id )
        // res.cookie('token', token);
        console.log("SignUp_TOKEN", token)

        res.cookie("token",token, {

          sameSite: NODE_ENV === "production" ? "None" : "Lax",
          secure: NODE_ENV === "production",
          httpOnly: NODE_ENV === "production",
        });

        //return res.json({ data: userData, message: "user account created" });

        // Send response with token
        return res.json({
          success: true,
          message: "User account created",
          token,
      // 🔹 Send token in response
          data: userData
           
      });
      


    } catch (error) {
        console.log(error)
        return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
    }
};



export  const userLogin = async (req, res, next) => {
  try {
 const {email,password} = req.body
  if (!email||!password) {
    return res.status(400).json({success:false,message:"all field required"})
  }

  const userExist = await User.findOne({ email });
 

  if (!userExist) {
      return res.status(404).json({ success: false, message: "user does not exist" });
  }

  const passwordMatch = bcrypt.compareSync(password, userExist.password);

  if (!passwordMatch) {
      return res.status(400).json({ success: false, message: "user not authenticated" });
  }

  const userId = userExist._id
  const token = generateUserToken(email,userId);

  

  // res.cookie('token',token,{
  //   sameSite: 'None',
  //   secure : true,
  //   httpOnly: true,
  //   path: '/',
  //   maxAge: 2 * 60 * 60 * 1000 // 2 hours in milliseconds
  // })


  
  res.cookie("token",token, {

    sameSite: NODE_ENV === "production" ? "None" : "Lax",
    secure: NODE_ENV === "production",
    httpOnly: NODE_ENV === "production",
  });
  //res.status(200).json({success:true,message:'user logged in successfully'})
  console.log("LoginToken--", token)

  // Send response with token
  return res.status(200).json({
    success: true,
    message: "User logged in successfully", 
    token,  // 🔹 Send token in response
    user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
        phone: userExist.phone
    }
});


    
  } catch (error) {
    res.status(error.status || 500).json({message: error.message || "internal server"})
  }
}


export const userLogout = async (req, res, next) => {
  try {
      res.clearCookie("token", {
        sameSite: NODE_ENV === "production" ? "None" : "Lax",
        secure: NODE_ENV === "production",
        httpOnly: NODE_ENV === "production",
      });
      res.status(200).json({ success: true, message: "user logout successfully" });
  } catch (error) {
      res.status(error.status || 500).json({ message: error.message || "Internal server error" });
  } 


  // export const userLogout = (req, res) => {
  //   res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
  //   res.status(200).json({ success: true, message: "Logout successful" });
  // };
};



// export  const userProfile = async (req, res, next) => {
//   try {
     
//       const {email} = req.user;
      
//       const userData = await User.findOne({email}).select("-password");

//       res.json({ success: true, message: "user data fetched", data: userData });
//   } catch (error) {
//     console.log(error)
//     console.log("Profile not fetched")
//       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// }



export const userProfile = async (req, res, next) => {
  try {

     console.log("Hi All")
      const userId = req.user.userId;
      console.log(userId)

      const userData = await User.findById(userId).select("-password");
      console.log("UserData",userData)
      return res.json({ data: userData, message: "user profile fetched" });
  } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
};



//user update
export const userUpdate = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { name, mobile, address } = req.body;

    // Upload image to Cloudinary if a file is provided
    let imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : undefined;

    // Update user details in MongoDB
    const user = await User.findOneAndUpdate(
      {email},
      {
        name,
        phone,
        address,
        ...(imageUrl && { image: imageUrl }), // Update image only if a new one was uploaded
      },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, message: "User updated successfully", data: user });
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};





// export const checkUser = async (req, res, next) => {
//   try {
//       const user = req.user;
//       console.log("User:",user)

//       if (!user) {
//           return res.status(400).json({ success: false, message: "user not authenticated" });
          
//       }
//       res.json({ success: true, message: "User authenticated" });
//   } catch (error) {
//       res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }}



// Ashwin
export const checkUser = async (req, res, next) => {
  try {
      return res.json({ message: "user autherized" });
  } catch (error) {
      return res.status(error.statusCode || 500).json({ message: error.message || "Internal server error" });
  }
};


// export const checkUser = async (req, res, next) => {
    
//     try {
//         //Fetch verified user from 'authMiddleware/authUser'
//         const user = req.user
//         // const userName = userData.name
//         console.log(user);
        
//         //Error handling
//         if(!user) {
//             return res.status(400).json({success: false, messaage:'authUser failed, user not authenticated'})
//         }

//         //Sucess response
//         res.json({ success: true, message: "User authenticated" });

//     } catch (error) {
//         res.status(error.status || 500).json({message: error.messaage || 'Internal server error'})
//     }
// }


// export const checkUser = async (req, res, next) => {
//     try {
        
//       const user = req.user;
  
//       if (!user) {
//         return res.status(401).json({
//           success: false,
//           message: 'Authentication failed, user not authenticated',
//         }); 
//       }
  
//       return res.json({
//         success: true,
//         message: 'User authenticated',
//         user: { id: user.userId, email: user.email },
//       });
//     } catch (error) {
//       console.error('Error in checkUser:', error.message);
//       res.status(error.status || 500).json({
//         success: false,
//         message: error.message || 'Internal server error',
//       });
//     }
//   };



