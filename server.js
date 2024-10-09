// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');

// const app = express();

// // Middleware
// app.use(bodyParser.urlencoded({ extended: true }));

// // Attempt to connect to MongoDB using the updated method
// mongoose.connect(process.env.MONGODB_URI)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// // Define a Mongoose Schema
// const formSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     message: String
// });

// // Create a Model
// const Form = mongoose.model('Form', formSchema);

// // Handle Form Submission
// app.post('/submit-form', async (req, res) => {
//     const formData = new Form({
//         name: req.body.Name,
//         email: req.body.Email,
//         phone: req.body.Phone,
//         message: req.body.message
//     });
//     try {
//         await formData.save();
//         res.send('Form data saved successfully!');
//     } catch (err) {
//         res.status(500).send('Error saving form data');
//     }
// });

// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });



require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // For handling cross-origin requests from your HTML form

const app = express();

// Middleware
app.use(bodyParser.json()); // To parse JSON request bodies
app.use(cors()); // Enable CORS to allow the HTML page to make requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

// Mongoose Schema and Model for form data
const formSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    project: String,
    message: String
});

const Form = mongoose.model('Form', formSchema);

// POST route to handle form submissions
app.post('/submit-form', async (req, res) => {
    const formData = new Form({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        project: req.body.project,
        message: req.body.message
    });

    try {
        await formData.save();
        res.send('Form data saved successfully!');
    } catch (err) {
        res.status(500).send('Error saving form data');
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
