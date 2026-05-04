const multer = require("multer");
const { resolve, extname } = require("node:path");
const { v4 } = require("uuid");

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", "uploads"),
        filename: (req, file, callback) => {
            
            const ext = extname(file.originalname); 
            
            const uniqueName = `${v4()}${ext}`;
            return callback(null, uniqueName);
        }
    })
}