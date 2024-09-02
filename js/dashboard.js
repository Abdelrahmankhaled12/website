import { API_URL } from './config.js';

// Function to handle API calls and update the DOM
const fetchDataAndUpdateDOM = (endpoint, elementId, dataKey) => {
    fetch(`${API_URL}${endpoint}`)
        .then(response => {
            if (!response.ok) {
                // Handle the error if the response is not OK
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON response
        })
        .then(data => {
            // Update the specified DOM element with the fetched data
            document.getElementById(elementId).innerHTML = data.data[dataKey];
        })
        .catch(error => {
            // Handle any errors that occur during the fetch operation
            console.error('There has been a problem with your fetch operation:', error);
        });
};

// Fetch total number of articles and update the DOM
fetchDataAndUpdateDOM('articles', 'totalArticles', 'total');

// Fetch total number of case studies and update the DOM
fetchDataAndUpdateDOM('case-study', 'totalCaseStudies', 'total');

// Fetch total number of categories/statistics and update the DOM
fetchDataAndUpdateDOM('statistics', 'totalCategories', 'length');
