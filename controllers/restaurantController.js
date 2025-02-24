// import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
// import { Restaurant } from "../models/restaurantModel.js";
// import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js";
// import {Dish} from "../models/dishModel.js"
// import multer from "multer";
// import mongoose from 'mongoose';
// import { MenuItem } from "../models/menuItemModel.js";
// //import uploadResult from "../utils/cloudinaryUpload.js";

// export const addRestaurant = async (req, res, next) => {
//   try {
//     console.log("File--",req.file,"Body--", req.body, "Images uploaded==")
//     const { name, cuisine, location, phone, rating, image, menuItems } = req.body;

//     console.log("Hi==", req.file)

//     // Check for existing restaurant
//     const existingRestaurant = await Restaurant.findOne({ name, location });
//     if (existingRestaurant) {
//       return res.status(400).json({ message: "Restaurant already exists" });
//     }

//    // let cloudinaryResponse
 
        

//     // Upload image to Cloudinary if provided
//     const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

//     // const imageUrl = req.file 
//     // ? req.file.path 
//     //   ? await imageUploadCloudinary(req.file.path) // For disk storage
//     //   : await imageUploadCloudinary(req.file.buffer) // For memory storage
//     // : image;



//     console.log("image===", imageUrl); 

//   //   if(req.file){
//   //     cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
//   // }

//   // console.log("cldRes====", cloudinaryResponse);

//     // Create new restaurant
//     const newRestaurant = new Restaurant({
//       name,
//       cuisine,
//       location,
//       phone,
//       rating,
//       image: imageUrl || image
//       //image: cloudinaryResponse.url
  
//     });

//     // Update menuItems if provided
//     if (menuItems && Array.isArray(menuItems)) {
//       newRestaurant.menuItems.push(...menuItems); // Assuming menuItems are ObjectIds
//     }

//     await newRestaurant.save();

//     res.status(200).json({ success: true, message: "Restaurant added successfully", data: newRestaurant });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };



// export const getAllRestaurants = async (req, res, next) => {
//   try {
//     const restaurants = await Restaurant.find();
//     res.status(200).json({ success: true, data: restaurants });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };



// export const getRestaurant = async (req, res, next) => {
//   try {
//     const { id } = req.params;

//     // Find the restaurant by ID and populate menuItems and their associated dishes
//     const restaurant = await Restaurant.findById(id)
//       .populate({
//         path: 'menuItems',
//         populate: {
//           path: 'dish',
//           model: 'Dish',  // Make sure the correct model name is used here
//         },
//       });

//     if (!restaurant) {
//       return res.status(404).json({ success: false, message: "Restaurant not found" });
//     }

//     res.status(200).json({ success: true, data: restaurant });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };



// export const deleteRestaurant = async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     const restaurant = await Restaurant.findByIdAndDelete(id);
//     console.log(id)
//     if (!restaurant) {
//       return res.status(404).json({ success: false, message: "Restaurant not found" });
//     }

//     res.status(200).json({ success: true, message: "Restaurant deleted successfully" });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };


// export const updateRestaurant = async (req, res, next) => {
//   try {
//     const { id } = req.params; // Get restaurant ID from request parameters
//     const { name, cuisine, location, phone, rating, addMenuItems, removeMenuItems, image } = req.body;

//     console.log(req.body, "Request Body =", req.params);

//     // Find the restaurant by ID
//     const restaurant = await Restaurant.findById(id);
//     if (!restaurant) {
//       return res.status(404).json({ success: false, message: "Restaurant not found" });
//     }

//     // Upload new image to Cloudinary if a new file is provided
//     let imageUrl = image;
//     if (req.file) {
//       imageUrl = await imageUploadCloudinary(req.file.path); // Cloudinary image upload
//     }

    
//     // Update restaurant fields if provided in the request body
//     restaurant.name = name || restaurant.name;
//     restaurant.cuisine = cuisine || restaurant.cuisine;
//     restaurant.location = location || restaurant.location;
//     restaurant.phone = phone || restaurant.phone;
//     restaurant.rating = rating || restaurant.rating;
//     if (imageUrl) restaurant.image = imageUrl; // Update the image URL if applicable

//     // Handle menu item additions
//     if (addMenuItems && Array.isArray(addMenuItems)) {
//       addMenuItems.forEach(item => {
//         if (!restaurant.menuItems.includes(item)) {
//           restaurant.menuItems.push(item); // Add only unique menu items
//         }
//       });
//     }

//     // Handle menu item removals
//     if (removeMenuItems && Array.isArray(removeMenuItems)) {
//       restaurant.menuItems = restaurant.menuItems.filter(item => !removeMenuItems.includes(item.toString())); // Remove specified items
//     }

//     // Save the updated restaurant to the database
//     await restaurant.save();

//     res.status(200).json({ success: true, message: "Restaurant updated successfully", data: restaurant });
//   } catch (error) {
//     console.error("Error updating restaurant:", error);
//     res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
//   }
// };




import { cloudinaryInstance } from "../config/cloudinaryConfig.js";
import { Restaurant } from "../models/restaurantModel.js";
//import { cloudinaryInstance } from "../config/cloudinary.js";



export const createRestaurant = async (req, res) => {
  try {
    const { name, description, location, image } = req.body;

    //Extract menu items data from request body
    const menuItemKeys = Object.keys(req.body).filter(key => key.startsWith('menuItems'));
    const menuItemIndices = [...new Set(menuItemKeys.map(key => key.match(/\[(\d+)\]/)[1]))];

    const menuItems = await Promise.all(menuItemIndices.map(async (index) => {
      const itemName = req.body[`menuItems[${index}].name`];
      const itemPrice = parseFloat(req.body[`menuItems[${index}].price`]); // Convert to Number
      const itemDescription = req.body[`menuItems[${index}].description`];
     // const itemVeg = req.body[`menuItems[${index}].veg`] === 'true'; // Convert to Boolean
     // const itemRecommended = req.body[`menuItems[${index}].recommended`] === 'true'; // Convert to Boolean
      const itemCategory = req.body[`menuItems[${index}].category`];
      
      //Handle both image1 and image2
      const itemImageFile1 = req.files[`menuItems[${index}].image1`]?.[0];
      const itemImageFile2 = req.files[`menuItems[${index}].image2`]?.[0];
      
      //Validate required fields
      if (!itemName || !itemPrice || !itemCategory) {
        return null; // Skip incomplete items
      }
      
      // Upload the first image (image1)

      console.log("File===>",itemImageFile1)

      let uploadedImage1 = null;
      if (itemImageFile1) {
        try {
          uploadedImage1 = await cloudinaryInstance.uploader.upload(itemImageFile1.path);
        } catch (error) {
          throw new Error(`Image1 upload failed for ${itemName}`);
        }
      }     

      // Upload the second image (image2)
      // let uploadedImage2 = null;
      // if (itemImageFile2) {
      //   try {
      //     uploadedImage2 = await cloudinaryInstance.uploader.upload(itemImageFile2.path);
      //   } catch (error) {
      //     throw new Error(`Image2 upload failed for ${itemName}`);
      //   }
      // }

      return {
        name: itemName,
        price: itemPrice,
        description: itemDescription || '', // Default to an empty string if not available
        //veg: itemVeg, // Veg field
        //recommended: itemRecommended, // Recommended field
        category: itemCategory, // Category field
        image1: uploadedImage1 ? uploadedImage1.secure_url : '', // Store image1 URL
        //image2: uploadedImage2 ? uploadedImage2.secure_url : '', // Store image2 URL
        restaurantName: name, // Include restaurant name
        restaurantLocation: location // Include restaurant location
      };
    }));

    // Filter out null items
    const validMenuItems = menuItems.filter(item => item !== null);
    console.log(validMenuItems);
    

    // Create the restaurant with menu items
    const restaurant = new Restaurant({
      name,
      description,
      location,
      menuItems: validMenuItems,
      user: req.user._id
    });

    const createdRestaurant = await restaurant.save();

    console.log(createdRestaurant);
    

    // Send the response
    res.status(201).json({
      success: true,
      message: `New restaurant '${createdRestaurant.name}' has been created successfully!`,
      data: createdRestaurant
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not create restaurant',
      error: error.message
    });
  }
};

//Get all restaurant
export const getRestaurant = async(req, res) =>{
    //Find restaurants and save to variable 'restaurants' and replace with populate('user, 'name') from Restaurant schema
    const restaurants = await Restaurant.find().populate('user', 'name')

    //Error handling
    if (restaurants){
        res.status(200).json({success: true, message: "All restaurants has been listed successfully!", restaurants})
        
    } else {
        res.status(404).json({success: false, message: 'Restaurant not found'})
    }
}

// Get restaurant by ID
export const getRestaurantById = async (req, res) => {
    //Find restaurant by Id and save to variable 'restaurants' and replace with populate('user, 'name') from Restaurant schema
    const restaurant = await Restaurant.findById(req.params.id).populate('user', 'name')

    if (restaurant) {
        res.status(200).json({success: true, message: "Restaurant '" + restaurant.name + "' listed successfully!", restaurant})
        
    } else {
        res.status(404).json({success: false, message: 'Restaurant not found' })
    }
}

export const getRestaurantByMenuItem = async (req, res) => {
  const { id } = req.body;

  try {
    // Find all restaurants
    const allRestaurants = await Restaurant.find(); // Fetch all restaurants

    // Filter restaurants based on id
    const restaurant = allRestaurants.find(restaurant =>
      restaurant.menuItems.some(item => item._id.toString() === id)
    );

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(restaurant); 
  } catch (error) {
    console.error("Error finding restaurant by menu item:", error);
    res.status(500).json({ message: "Server error" });
  }
};



export const updateRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Idd-->", id)
    const { name, description, location } = req.body;
    console.log("NAME--", name)
    console.log("DESCRIPTION--", description)
    console.log("LOCATION--", location)

    // Fetch the restaurant to update
    const restaurant = await Restaurant.findById(id);
    if (!restaurant) return res.status(404).json({ message: "Restaurant not found" });

    // Update basic restaurant info
    if (name) restaurant.name = name;
    console.log("Updated NAME--", name)
    if (description) restaurant.description = description;
    if (location) restaurant.location = location;

    // Loop over req.files to handle image uploads
    // for (const key of Object.keys(req.files)) {
    //   const match = key.match(/^menuItems\[(\d+)\]\.(image1|image2)$/); // Match pattern for image1 or image2
    //   if (match) {
    //     const index = match[1]; // Extract index (e.g., 0, 1, 2)
    //     const field = match[2]; // Extract image1 or image2

    //     if (restaurant.menuItems[index]) {
    //       const itemName = restaurant.menuItems[index].name;

    //       // Upload the image
    //       const imageFile = req.files[key]?.[0]; // Get the file from req.files
    //       if (imageFile) {
    //         try {
    //           const uploadedImage = await cloudinaryInstance.uploader.upload(imageFile.path);
    //           restaurant.menuItems[index][field] = uploadedImage.secure_url; // Update the URL in menu item
    //         } catch (error) {
    //           throw new Error(`${field} upload failed for ${itemName}`);
    //         }
    //       }
    //     } else {
    //       console.error(`Menu item at index ${index} does not exist`);
    //     }
    //   }
    // }

    // Update other fields for menu items (dynamically parse req.body keys)
    for (const key of Object.keys(req.body)) {
      const match = key.match(/^menuItems\[(\d+)\]\.(.+)$/); // Match pattern menuItems[0].fieldName
      if (match) {
        const index = match[1]; // Extract index (e.g., 0, 1, 2)
        const field = match[2]; // Extract field name (e.g., category, price)

        // Only update if the item exists
        if (restaurant.menuItems[index] && field !== 'image1' && field !== 'image2') {
          restaurant.menuItems[index][field] = req.body[key];
        }
      }
    }

    // Save the updated restaurant
    const updatedRestaurant = await restaurant.save();

    res.status(200).json({
      success: true,
      message: `Restaurant '${updatedRestaurant.name}' updated successfully!`,
      data: updatedRestaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error: Could not update restaurant',
      error: error.message,
    });
  }
};


//Delete restaurant
export const deleteRestaurant = async (req, res) => {

    try {
        const restaurant = await Restaurant.findByIdAndDelete(req.params.id)
        res.status(201).json({success: true, message: "Restaurant '" + restaurant.name + "' deleted successfully!", restaurant})
    } catch (error) {
        res.status(404).json({success: false, message: 'Restaurant not found'})
    }
}

//Search restaurant
export const searchRestaurant = async (req, res) => {
  const { query } = req.query;

  try {
    const results = await Restaurant.find({
      $or: [
          { name: { $regex: query, $options: 'i' } },  // Match restaurant name
          { 'menuItems.name': { $regex: query, $options: 'i' } }  // Match menu item name
      ]
  }).populate('menuItems');
    
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}

