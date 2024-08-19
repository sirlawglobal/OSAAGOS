const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Init upload
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // Limit file size to 1MB
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
}).single('profilePicture');

// Middleware to handle multer errors
function uploadMiddleware(req, res, next) {
    upload(req, res, function(err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: err.message });
        } else if (err) {
            return res.status(400).json({ message: err });
        }

    

        if (!req.file) {
            return next(); // Continue even if no file is uploaded
        }

        console.log('File uploaded:', req.file);
        next();
    });
}

module.exports = uploadMiddleware;


// const multer = require('multer');
// const path = require('path');

// // Set storage engine
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });

// // Check file type
// function checkFileType(file, cb) {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
    
//     if (mimetype && extname) {
//         return cb(null, true);
//     } else {
//         cb('Error: Images Only!');
//     }
// }


// // Init upload
// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 1000000 }, // Limit file size to 1MB
//     fileFilter: function(req, file, cb) {
//         checkFileType(file, cb);
//     }
// }).single('profilePicture');

// console.log("upload", upload)
// // Middleware to handle multer errors
// function uploadMiddleware(req, res, next) {
//     upload(req, res, function(err) {
//         if (err instanceof multer.MulterError) {
//             return res.status(400).json({ message: err.message });
//         } else if (err) {
//             return res.status(400).json({ message: err });
//         }
//         next();
//     });
// }
// // module.exports = upload;
// module.exports = uploadMiddleware;

