import dotenv from 'dotenv'
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

console.log('Cloudinary Config:');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLD_NAME);
console.log('CLOUDINARY_API_KEY:', process.env.CLD_API_KEY);
console.log('CLOUDINARY_API_SECRET:', process.env.CLD_API_SECRET);


    // Configuration
    cloudinary.config({ 
      cloud_name: process.env.CLD_NAME, 
      api_key: process.env.CLD_API_KEY, 
      api_secret: process.env.CLD_API_SECRET,

      
  })




export const cloudinaryInstance = cloudinary