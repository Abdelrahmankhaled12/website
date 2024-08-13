import { API_URL } from './config.js';


// Get Elements 
const INPUT_EMAIL = document.getElementById("email"); // Email input field
const INPUT_PASSWORD = document.getElementById("password"); // Password input field
const BUTTON_LOGIN = document.getElementById("formLoginButton"); // Login button
const ERROR = document.getElementById("error"); // Error message container

// Add click event listener to the login button
BUTTON_LOGIN.addEventListener("click", () => {
    // Check if both email and password fields are not empty
    if (INPUT_EMAIL.value.trim() && INPUT_PASSWORD.value.trim()) {
        // Call login function and handle the response
        LOGIN_USER_SYSYEM().then((res) => {
            if (res.status === 200) {
                // If login is successful, store token in session storage and redirect to dashboard
                sessionStorage.setItem("token", JSON.stringify(res.data.token));
                window.location.href = "dashboard.html";
            } else {
                // If login fails, display error message
                ERROR.style.display = "block";
            }
        });
    }
});

// Function to login user asynchronously
const LOGIN_USER_SYSYEM = async () => {
    // Return a Promise to handle asynchronous operations
    return new Promise((resolve, reject) => {
        // Create a new FormData object to store form data
        const formData = new FormData();
        // Append form fields to FormData object
        formData.append('email', INPUT_EMAIL.value);
        formData.append('password', INPUT_PASSWORD.value);

        // Make a POST request to the login API
        fetch(API_URL + "login", {
            method: 'POST',
            body: formData,
        })
            .then(response => {
                // Check if response status is OK
                if (!response.ok) {
                    // If response status is not OK, throw an error
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // If response status is OK, parse response as JSON
                return response.json();
            })
            .then(data => {
                // Resolve the Promise with parsed JSON data
                resolve(data);
            })
            .catch(error => {
                // If an error occurs during the fetch operation, reject the Promise with the error
                reject(error);
            });
    });
};
