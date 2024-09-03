// Import constants and functions from the configuration file
import { API_URL } from './config.js';

// Get the query parameters from the page's URL
const searchParams = new URLSearchParams(location.search);

// Fetch article data using the ID extracted from the query parameters
fetch(`${API_URL}articles/${searchParams.get('id')}`)
    .then(response => {
        // If the response status is 404 (not found), redirect the user to the articles page
        if (response.status === 404) {
            window.location.href = "articles.html";
        }
        // Check if the response is not OK, throw an error if there's a network issue
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Return the response data as JSON for further processing
        return response.json();
    })
    .then(data => {
        // Variable to track whether additional information has been displayed
        let additional_info = false;

        // Sort the content by the 'sort' value, then loop through each item
        data.data.content.sort((a, b) => a.sort - b.sort).forEach((item, index) => {
            let div = document.createElement("div");

            // If the item is the main title
            if (item.sort === 0) {
                div.classList.add("title");
                div.innerHTML = `
                    <span>Case Study:</span>
                    <h1>${item.title}</h1>
                    <p>${item.body}</p>
                `;
            } else {
                // If additional info is available or the sort index matches the current index
                if (additional_info || index === item.sort) {
                    // If the item contains an image
                    if (item.image) {
                        div.classList.add("image");
                        div.innerHTML = `
                            <img src=${item.image} alt="">
                        `;
                    } else {
                        div.classList.add("text");
                        div.innerHTML = `
                            ${item.title === "" ? "" : `<h1> ${item.title}</h1>`}
                            <div class="body">
                                ${item.body}
                            </div>
                        `;
                    }
                } else {
                    // Add additional information if required
                    additional_info = true;
                    div.classList.add("paragraph");
                    div.innerHTML = `
                        <div class="bodyParagraph">
                            <div class="icon">
                                <img src="./assets/Quote.png" alt="">
                            </div>
                            <p>${data.data.additional_info}</p>
                            <div class="footer">
                                <div class="image">
                                    <img src="./assets/Img.png" alt="">
                                </div>
                                <div class="footerText">
                                    <h3>William Griffin</h3>
                                    <span>Founder and CEO of Agro Company</span>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
            // Append the div to the 'partOne' section of the page
            document.getElementById("caseStudyShow").append(div);
        });

    })
    .catch(error => {
        // Log the error if there's an issue with the fetch operation
        console.error('There has been a problem with your fetch operation:', error);
    });

// Fetch statistical data
fetch(`${API_URL}statistics`)
    .then(response => {
        // Check if the response is not OK, throw an error if there's a network issue
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Return the response data as JSON for further processing
        return response.json();
    })
    .then(data => {
        // Check if there is data to display
        if (data.data.length > 0) {
            data.data.forEach((item, index) => {
                // Display only the first 5 items
                if (index < 5) {
                    let div = document.createElement("div");
                    // Add a CSS class based on the item's status
                    div.classList.add("boxShares", item.status === "-" ? "boxDown" : "boxUP");
                    div.innerHTML = `
                        <div class="box">
                            <i class="fa-solid fa-arrow-up-long"></i>
                            <p>${item.percentage.toFixed(2)}%</p>
                        </div>
                        <div class="text">
                            <p>${item.title}</p>
                            <span>${item.country}</span>
                        </div>
                    `;
                    // Append the div to the 'categories' section of the page
                    document.getElementById("categories").append(div);
                }
            });
        }
    })
    .catch(error => {
        // Log the error if there's an issue with the fetch operation
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
        if (data.data.data.length > 0) {
            data.data.data.forEach((item, index) => {
                let div = document.createElement("div");
                div.classList.add("box");
                div.innerHTML = `
                    <div class="image" style="background-image: url(${item.background});">
                    </div>
                    <div class="text">
                        <h3>${item.title}</h3>
                        <p>${item.body}</p>
                        <button class="veiwMore">
                            <span>View more</span>
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                `;
                // Add click event to redirect to the article page
                div.addEventListener("click", () => {
                    window.location.href = `casestudy.html?&casestudy=${item.title}&id=${item.id}`;
                });

                // Append clones of the div to different groups for different sections
                if (index <= 2) {
                    document.getElementById("groupOne").append(div.cloneNode(true));
                }
                if (index > 2 && index < 6 && data.data.data.length >= 6) {
                    document.getElementById("groupTwo").append(div.cloneNode(true));
                }

                // Append the div to the main carousel container
                document.getElementById("carouselContainerBoxesDesktop").append(div);
            });
            const buttonArrowLeft = document.querySelectorAll(".arrowLeft");
            const buttonArrowRight = document.querySelectorAll(".arrowRight");

            buttonArrowLeft.forEach((button) => {
                button.addEventListener("click", () => { navigation("left"); });
            });

            buttonArrowRight.forEach((button) => {
                button.addEventListener("click", () => { navigation("right"); });
            });

            if (data.data.data.length < 6) {
                // Hide the carousel navigation buttons if there are not enough articles
                document.getElementById("buttons").style.display = "none";
            }
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// Function to handle carousel navigation
const navigation = (dir) => {
    const containers = document.querySelectorAll(".carouselContainerBoxes"); // Getting reference to carousel container

    containers.forEach((container) => {
        // Calculating scroll amount based on direction
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 5)
                : container.scrollLeft + (container.offsetWidth + 5);
        // Smooth scrolling to the calculated scroll amount
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    })

};