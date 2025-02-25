import express from "express"
import {addFood,listfood,removeFood} from "../../controllers/foodController.js"
import multer from "multer"

const router = express.Router()

//Image storage 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req,file,cb) =>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

router.post('/add',upload.single("image"), addFood)
router.get('/list',listfood);
router.post('/remove',removeFood);


export default router;