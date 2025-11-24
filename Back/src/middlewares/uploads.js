const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // carpeta donde se guardarán los archivos
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); 
    }
});

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB
    },
    fileFilter(req, file, cb) {
        const tipos = /jpeg|jpg|png|gif/;
        const mime = tipos.test(file.mimetype);
        const ext = tipos.test(path.extname(file.originalname).toLowerCase());

        if (mime && ext) cb(null, true);
        else cb(new Error("Formato de imagen no permitido"));
    }
});

module.exports = upload;
