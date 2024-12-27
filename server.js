// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const fs = require('fs');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Enable CORS
// app.use(cors());

// // Set up storage location and filename handling
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir); // Create the uploads folder if it doesn't exist
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     const uniqueName = `${Date.now()}-${file.originalname}`;
//     cb(null, uniqueName);
//   },
// });

// // File size limit (2MB) and file type validation
// const upload = multer({
//   storage,
//   limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png/;
//     const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
//     const mimeType = fileTypes.test(file.mimetype);

//     if (mimeType && extname) {
//       cb(null, true);
//     } else {
//       cb(new Error('Only images are allowed (jpeg, jpg, png)'));
//     }
//   },
// });

// // Upload route
// app.post('/api/upload', upload.single('image'), (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const fileUrl = `/uploads/${file.filename}`; // Relative URL for the uploaded file
//     return res.status(200).json({ imageUrl: fileUrl });
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: 'File upload failed' });
//   }
// });

// // Serve static files (uploaded images)
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send({ error: err.message });
// });

// // Start the server
// const PORT = process.env.PORT || 1024;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });