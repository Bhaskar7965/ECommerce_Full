const app = require('./app');
const dotenv = require('dotenv');
const cors = require('cors'); // Import the 'cors' middleware
const connectDatabase = require('./config/database');
const cloudinary = require('cloudinary');

app.use(cors()); // Use 'cors' middleware to allow cross-origin requests

// configure dotenv
dotenv.config({ path: "backend/config/config.env" });

// connect to database
connectDatabase();

cloudinary.config({
    cloud_name: 'ds3t0xxe9',
    api_key: '777133619932181',
    api_secret: '6tFshQp4uiqvYSlTcPNBAww7pr0'
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});





//! Red (!)
//? Blue (?)
//* Green (*)
//^ Yellow (^)
//& Pink (&)
// Purple (~)
// todo Mustard (todo)
// Grey (//)