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
});

module.exports = upload;





// const path = require('path');
// const cloudinary = require('../config/cloudinaryConfig'); // Import your Cloudinary config
// const { v4: uuidv4 } = require('uuid'); // For generating unique names
// const { PassThrough } = require('stream');

// // Middleware to handle file uploads
// const upload = async (req, res, next) => {
//   console.log("req_", req.files.file);

//   try {
//     if (!req.files || !req.files.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const file = req.files.file;

//     // Create a PassThrough stream to pipe the file data
//     const stream = cloudinary.uploader.upload_stream({
//       folder: 'osagoo', // Optional: Define a folder name in Cloudinary
//       public_id: uuidv4(), // Unique public ID for the file
//       use_filename: true,
//       unique_filename: false,
//       resource_type: 'auto'
//     }, (error, result) => {
//       if (error) {
//         return next(error);
//       }

//       req.file = {
//         url: result.secure_url,
//         public_id: result.public_id
//       };

//       next(); // Proceed to the next middleware or route handler
//     });

//     // Pipe file data to the Cloudinary upload stream
//     file.data.pipe(stream);

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// module.exports = upload;
