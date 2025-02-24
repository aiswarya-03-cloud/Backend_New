// import { MenuItem } from "../models/menuItemModel.js";
// import { Restaurant } from "../models/restaurantModel.js";
// import { Dish } from "../models/dishModel.js";
// import { imageUploadCloudinary } from "../utils/cloudinaryUpload.js"; // Ensure you have this utility function to handle the Cloudinary upload
// import multer from "multer";



// export const addMenuItem = async (req, res, next) => {
//   try {
//     const {name, description, restaurant, dish, image } = req.body ;

// console.log (req.bdy)
//     // Upload image to Cloudinary if provided
//     const imageUrl = req.file ? await imageUploadCloudinary(req.file.path) : image;

//     const newMenuItem = new MenuItem({
//       name,
//       description,
//       restaurant ,
//       dish ,
//       image: imageUrl || image
//     });

  
//     await newMenuItem.save();

//     res.status(201).json({ success: true, message: "Menu Item created successfully", data: newMenuItem });
//   } catch (error) {
//     console.error(error);
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };






// // Get a Menu Item by ID
// export const getMenuItem = async (req, res, next) => {
//   try {
//     const { id } = req.params;
   
//     const menuItem = await MenuItem.findById(id).populate('restaurant')
//       .populate('restaurant')
//       .populate('dish');

//     if (!menuItem) {
//       return res.status(404).json({ success: false, message: "Menu Item not found" });
//     }

//     res.status(200).json({ success: true, data: menuItem });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };

// // Get All Menu Items
// export const getAllMenuItems = async (req, res, next) => {
//   try {
//     const menuItems = await MenuItem.find();
//       // .populate('restaurant')
//       // .populate('dish');

//     if (!menuItems || menuItems.length===0) {
//       return res.status(404).json({ success: false, message: "No menu items found" });
//     }

//     res.status(200).json({ success: true, data: menuItems });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };




// // Delete a Menu Item by ID
// export const deleteMenuItem = async (req, res, next) => {
//   try {
//     const { id } = req.body;
//     console.log(id)

//     // Find and delete the menu item by ID
//     const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

//     if (!deletedMenuItem) {
//       return res.status(404).json({ success: false, message: "Menu Item not found" });
//     }

//     res.status(200).json({ success: true, message: "Menu Item deleted successfully" });
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(error.status || 500).json({ message: error.message || "Internal server error" });
//   }
// };




// // Update a Menu Item by ID 

// export const updateMenuItem = async (req, res, next) => {
//   try {
//     const { id } = req.params; // Get menu item ID from request parameters
//     const { name, description, addRestaurants, removeRestaurants, addDishes, removeDishes, image } = req.body;

//     console.log(req.body, "Request Body =", req.params);

//     // Find the menu item by ID
//     const menuItem = await MenuItem.findById(id);
//     if (!menuItem) {
//       return res.status(404).json({ success: false, message: "Menu Item not found" });
//     }

//     // Upload new image to Cloudinary if a new file is provided
//     let imageUrl = image;
//     if (req.file) {
//       imageUrl = await imageUploadCloudinary(req.file.path); // Cloudinary image upload
//     }

//     // Update menu item fields if provided in the request body
//     menuItem.name = name || menuItem.name;
//     menuItem.description = description || menuItem.description;
//     if (imageUrl) menuItem.image = imageUrl; // Update image URL if applicable

//     // Handle restaurant additions
//     if (addRestaurants && Array.isArray(addRestaurants)) {
//       addRestaurants.forEach(restaurantId => {
//         if (!menuItem.restaurant.includes(restaurantId)) {
//           menuItem.restaurant.push(restaurantId); // Add only unique restaurant references
//         }
//       });
//     }

//     // Handle restaurant removals
//     if (removeRestaurants && Array.isArray(removeRestaurants)) {
//       menuItem.restaurant = menuItem.restaurant.filter(restaurantId => !removeRestaurants.includes(restaurantId.toString()));
//     }

//     // Handle dish additions
//     if (addDishes && Array.isArray(addDishes)) {
//       addDishes.forEach(dishId => {
//         if (!menuItem.dish.includes(dishId)) {
//           menuItem.dish.push(dishId); // Add only unique dish references
//         }
//       });
//     }

//     // Handle dish removals
//     if (removeDishes && Array.isArray(removeDishes)) {
//       menuItem.dish = menuItem.dish.filter(dishId => !removeDishes.includes(dishId.toString()));
//     }

//     // Save the updated menu item to the database
//     await menuItem.save();

//     res.status(200).json({ success: true, message: "Menu Item updated successfully", data: menuItem });
//   } catch (error) {
//     console.error("Error updating menu item:", error);
//     res.status(error.status || 500).json({ success: false, message: error.message || "Internal server error" });
//   }
// };






import { Menu } from "../models/menuItemModel.js"
import { cloudinaryInstance } from "../config/cloudinaryConfig.js"
import { Restaurant } from "../models/restaurantModel.js"

//Create a menu item
export const createMenuItem = async (req, res) => {

    try {
        const {name, description, price, availability, restaurantId} = req.body

        // Check for missing fields
        if (!name || !price || !restaurantId) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        //Error handling for Menu Item exist
        let menuItemExist = await Menu.findOne({ name, restaurant: restaurantId})
        if (menuItemExist) {
            return res.status(400).json({ success: false, message: `${menuItemExist.name} already exists!` })
        }

        //Upload an image
        let uploadedImage = null;
        if (req.file) {
          console.log("Image UPLOAD--", req.file.path)
            try {
                uploadedImage = await cloudinaryInstance.uploader.upload(req.file.path)
                console.log("UPLOAD--",uploadedImage)
            } catch (error) {
                console.error('Image upload failed:', error)
                //return res.status(500).json({ success: false, message: 'Image upload failed' })
            }



            // uploadedImage = await cloudinaryInstance.uploader.upload(req.file.path)
            //      console.log("UPLOAD--",uploadedImage)


               
                  // uploadedImage = await cloudinaryInstance.uploader.upload(req.file.path);
                  // console.log("UPLOAD--",uploadedImage)
            


        }

        //New menu instance
        const menuItem = new Menu({ 
            name,
            description,
            price,
            availability,
            //The URL of the uploaded image, if any (or null if no image was provided)
            image: uploadedImage ? uploadedImage.url : "",
            restaurant: restaurantId
        })

        //Save the menu item
        const createdMenuItem = await menuItem.save()
        console.log("menuItem-->", createdMenuItem)

        //
        const restaurantName = await Restaurant.findById(createdMenuItem.restaurant)
         console.log("Name--",createdMenuItem.name)
         console.log("Restaurant--", restaurantName)
        //Success response
        res.status(201).json({ success: true, message: `'${createdMenuItem.name}' created successfully under restaurant '${restaurantName.name}'!`, createdMenuItem })

    } catch (error) {
        console.error('Error creating menu item', error);
        res.status(500).json({ success: false, message: 'Server error, unable to create menu item' })
    }
    
} 

//Get all menu items for a restaurant
export const getMenuItems = async (req, res) => {
    try {

        const {restaurantId} = req.params;
        console.log("restId...",restaurantId);
        console.log("res--->", req.params.restaurantId)

        const menuItems = await Menu.find({restaurant:req.params.restaurantId})
        // const menuItems = await Menu.findById(restaurantId)
        res.status(201).json({success: true, message: 'All items fetched successfully', menuItems})
    } catch (error) {
        res.status(404).json({success: false, message: 'Items not found'})
    }
}

//Get menu item by Id
export const menuItemById = async (req, res) => {
    try {
        const itemById = await Menu.findById(req.params.id)
        console.log("Item---", itemById);
        
        res.status(201).json({success: true, message: itemById.name +  ' data received successfully', itemById})

    } catch (error) {
        res.status(404).json({success: false, message: 'Items not found'})
    }
}

//Update menu item
export const updateMenuItem = async (req, res) => {
    try {
        const updatedMenuItem = await Menu.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(201).json({ data: updatedMenuItem,success: true, message: 'Item updated' })
    } catch (error) {
        res.status(404).json({ success: false, message: 'Item not found' })
    }
}

//Delete menu item
export const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findByIdAndDelete(req.params.id)
        const restaurant = await Restaurant.findById(menuItem.restaurant)
        res.status(201).json({success: true, message: `Item '${menuItem.name}' deleted from '${restaurant.name}' successfully!`, menuItem})
    } catch (error) {
        res.status(404).json({success: false, message: 'Item not found'})
    }
}



