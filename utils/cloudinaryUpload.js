

import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

export const imageUploadCloudinary = async (path) => {
  
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path,{ folder: 'DineDelight_FoodApp' })
            
        console.log(uploadResult, "==UPLOADED")
        return  uploadResult.url;



    } catch (error) {
        console.log(error, "STRING--")

     }
};




// // import { cloudinaryInstance } from "../config/cloudinaryConfig.js";

// // export const imageUploadCloudinary = async (path) => {
  
    
// //         const uploadResult = await cloudinaryInstance.uploader.upload(request.file.path).catch((error) => {
// //                                 console.log(error);
// //         });
    


// // console.log(uploadResult);

// //     };






