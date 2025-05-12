const multer = require("multer");
const path = require("path");
const fs = require("fs");


const filePath = path.join(__dirname, "..", "..", "public", "products");
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, filePath); 
  },
  filename: (req, file, cb) => {
   
    const fileName = Date.now() + '-' + Math.round(Math.random() * 9999) + '-' + file.originalname;
    cb(null, fileName); 
  }
});


const upload = multer({ storage });

const uploadImage = upload.single('image'); 

module.exports = uploadImage;
