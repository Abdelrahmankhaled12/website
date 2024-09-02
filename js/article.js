import { API_URL, timeSince } from './config.js';

const searchParams = new URLSearchParams(location.search); // Retrieve query parameters from the URL

// Fetch a single article based on the ID from the URL
fetch(API_URL + `articles/${searchParams.get('id')}`)
    .then(response => {
        if (response.status === 404) {
            // If the article is not found, redirect to the articles listing page
            window.location.href = "articles.html";
        }
        if (!response.ok) {
            // Handle other errors in the network response
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        // Update the article content on the page
        document.getElementById("imgArticle").src = data.data.background;
        document.getElementById("titleArticleTop").innerHTML = data.data.title;
        document.getElementById("descriptionArticleTop").innerHTML = data.data.body;
        document.getElementById("time").innerHTML = timeSince(data.data.created_at);

        // Sort and render the content sections of the article
        data.data.content.sort((a, b) => a.sort - b.sort).forEach((item) => {
            let div = document.createElement("div");
            if (item.image) {
                // Create an image section if the content includes an image
                div.classList.add("image");
                div.innerHTML = `<img src=${item.image} alt="">`;
            } else {
                // Create a text section if the content includes text
                div.classList.add("text");
                div.innerHTML = `
                    <h1>${item.title}</h1>
                    <div class="body">
                        ${item.body}
                    </div>
                `;
            }
            document.getElementById("aboutArticle").append(div); // Append the created element to the article content
        });
    })
    .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('There has been a problem with your fetch operation:', error);
    });

// Fetch all articles to display in different sections
fetch(API_URL + "articles")
    .then(response => {
        if (!response.ok) {
            // Handle errors in the network response
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        if (data.data.data.length > 0) {
            // Iterate over the articles and create elements to display them
            data.data.data.forEach((item, index) => {
                let div = document.createElement("div");
                div.classList.add("box");
                div.innerHTML = `
                    <div class="image">
                        <img src=${item.background} alt="">
                    </div>
                    <div class="text">
                        <div class="logo">
                            <img src="./assets/logo.png" alt="">
                        </div>
                        <h2>${item.title}</h2>
                        <p>${item.body}</p>
                        <div class="footer">
                            <a href="article.html?&article=${item.title}&id=${item.id}" class="readArticle">
                                <p>Read article</p>
                                <i class="fa-solid fa-chevron-right"></i>
                            </a>
                            <span>
                                <span>${timeSince(item.created_at)}</span>
                                <img src="./assets/pages.png" alt="">
                            </span>
                        </div>
                    </div>
                `;

                // Add click event to redirect to the article page
                div.addEventListener("click", () => {
                    window.location.href = `article.html?&article=${item.title}&id=${item.id}`;
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

            // Handle carousel navigation if there are enough articles
            if (data.data.data.length >= 6) {
                const buttonArrowLeft = document.querySelectorAll(".arrowLeft");
                const buttonArrowRight = document.querySelectorAll(".arrowRight");

                buttonArrowLeft.forEach((button) => {
                    button.addEventListener("click", () => { navigation("left"); });
                });

                buttonArrowRight.forEach((button) => {
                    button.addEventListener("click", () => { navigation("right"); });
                });
            } else {
                // Hide the carousel navigation buttons if there are not enough articles
                document.getElementById("buttons").style.display = "none";
            }
        }
    })
    .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('There has been a problem with your fetch operation:', error);
    });

// Function to handle carousel navigation
const navigation = (dir) => {
    const containers = document.querySelectorAll(".carouselContainerBoxes"); // Select all carousel containers
    containers.forEach((container) => {
        // Calculate the scroll amount based on the direction (left or right)
        const scrollAmount = dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 5)
            : container.scrollLeft + (container.offsetWidth + 5);
        
        // Perform a smooth scroll to the calculated position
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    });
};

// Fetch statistics data and render them on the page
fetch(`${API_URL}statistics`)
    .then(response => {
        if (!response.ok) {
            // Handle errors in the network response
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON response
    })
    .then(data => {
        if (data.data.length > 0) {
            // Iterate over the statistics and create elements to display them
            data.data.forEach((item, index) => {
                if (index < 5) {
                    let div = document.createElement("div");
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
                    // Append the created element to the categories container
                    document.getElementById("categories").append(div);
                }
            });
        }
    })
    .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('There has been a problem with your fetch operation:', error);
    });
