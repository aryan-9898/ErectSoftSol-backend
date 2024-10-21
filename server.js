
// require('dotenv').config(); // Load environment variables

// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors'); // For handling cross-origin requests from your HTML form

// const app = express();

// // Middleware
// app.use(bodyParser.json()); // To parse JSON request bodies
// app.use(cors()); // Enable CORS to allow the HTML page to make requests

// // MongoDB connection
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Could not connect to MongoDB...', err));

// // Mongoose Schema and Model for form data
// const formSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     phone: String,
//     project: String,
//     message: String
// });

// const Form = mongoose.model('Form', formSchema);

// // POST route to handle form submissions
// app.post('/submit-form', async (req, res) => {
//     const formData = new Form({
//         name: req.body.name,
//         email: req.body.email,
//         phone: req.body.phone,
//         project: req.body.project,
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
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    project: { type: String, required: true },
    message: { type: String, required: true }
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
        // Save the form data to the database
        await formData.save();
        
        // Explicitly set status to 200 OK and send a success message
        res.status(200).send('Form data saved successfully!');
    } catch (err) {
        console.error('Error saving form data:', err); // Log error details in the console

        // Send back a 500 response with the error message for easier debugging
        res.status(500).send(`Error saving form data: ${err.message}`);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

