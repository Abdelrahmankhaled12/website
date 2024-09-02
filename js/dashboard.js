import { API_URL } from './config.js';

fetch(`${API_URL}articles`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("totalArticles").innerHTML = data.data.total;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

fetch(`${API_URL}case-study`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("totalCaseStudies").innerHTML = data.data.total;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


fetch(`${API_URL}statistics`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("totalCategories").innerHTML = data.data.length;
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
