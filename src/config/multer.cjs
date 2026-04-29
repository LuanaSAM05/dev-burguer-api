const multer = require("multer");
const { resolve, extname } = require("node:path");
const { v4 } = require("uuid");

module.exports = {
    storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", "uploads"),
        filename: (req, file, callback) => {
            // Pega a extensão do arquivo original
            const ext = extname(file.originalname); // ex: ".png" ou ".jpg"
            // Cria um nome único
            const uniqueName = `${v4()}${ext}`;
            return callback(null, uniqueName);
        }
    })
}