import multer from 'multer'


const storage = multer.diskStorage({

//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
//     // cb(null, file.fieldname + '-' + uniqueSuffix)
//     cb(null, )
//   }
// })

filename: function (req, file, cb) {
  console.log('file===',file);
  
  cb(null, file.originalname);
},
});

export const upload = multer({ storage: storage })