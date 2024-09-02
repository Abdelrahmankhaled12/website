import { API_URL } from './config.js';

// Get Elements
const INPUT_EMAIL = document.getElementById("email"); // Email input field
const INPUT_PASSWORD = document.getElementById("password"); // Password input field
const BUTTON_LOGIN = document.getElementById("formLoginButton"); // Login button
const ERROR = document.getElementById("error"); // Error message container

// Add click event listener to the login button
BUTTON_LOGIN.addEventListener("click", () => {
    // Validate that both email and password fields are not empty
    if (INPUT_EMAIL.value.trim() && INPUT_PASSWORD.value.trim()) {
        // Call the login function and handle the response
        LOGIN_USER_SYSTEM().then((res) => {
            if (res.status === 200) {
                // If login is successful, store the token in session storage and redirect to the dashboard
                sessionStorage.setItem("token", JSON.stringify(res.data.token));
                window.location.href = "dashboard.html";
            } else {
                // If login fails, display an error message
                ERROR.style.display = "block";
            }
        }).catch(() => {
            // Display an error message in case of any exceptions
            ERROR.style.display = "block";
        });
    }
});

// Function to handle user login asynchronously
const LOGIN_USER_SYSTEM = async () => {
    // Return a Promise to handle the asynchronous login operation
    return new Promise((resolve, reject) => {
        // Create a new FormData object to store form data
        const formData = new FormData();
        formData.append('email', INPUT_EMAIL.value); // Append the email to the form data
        formData.append('password', INPUT_PASSWORD.value); // Append the password to the form data

        // Make a POST request to the login API
        fetch(`${API_URL}login`, {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            // Check if the response is successful (status 200-299)
            if (!response.ok) {
                // If the response is not OK, throw an error
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // If successful, parse the response as JSON
            return response.json();
        })
        .then(data => {
            // Resolve the promise with the parsed JSON data
            resolve(data);
        })
        .catch(error => {
            // If an error occurs during the fetch operation, reject the promise with the error
            reject(error);
        });
    });
};


document.addEventListener("DOMContentLoaded", function () {
    // Execute the following code after a delay of 5000 milliseconds (5 seconds)
    setTimeout(() => {
        // Hide the loader element after 5 seconds
        document.getElementById("loader").style.display = "none";
        // Hide the effect element after 5 seconds
        document.getElementById("effect").style.display = "none";
        // Show the sections element after 5 seconds
        document.getElementById("sections").style.display = "block";
        // Otherwise, hide the buttonScroll
        buttonScroll.style.opacity = "0";
    }, 2000); // 2000 milliseconds = 2 seconds
});
