const form = document.getElementById('registration-form');

form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent default form submission

    // 1. Get form data
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // 2. Validate input (add more validation as needed)
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // 3. Send data to server (using AJAX or Fetch API)
    fetch('/register', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
    })
    .then(response => {
        if (response.ok) {
            alert('Registration successful!');
            // Clear the form
            form.reset();
        } else {
            alert('Registration failed. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    });
});

// Example email validation function
function validateEmail(email) {
    // Use a regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Replace with your actual database setup
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/game-pre-registration', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a model for pre-registrations
const PreRegistrationSchema = new mongoose.Schema({
    email: { type: String, required: true },
    username: String,
    password: String
});
const PreRegistration = mongoose.model('PreRegistration', PreRegistrationSchema);

app.use(bodyParser.json());

app.post('/register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Validate data (add more validation as needed)
        