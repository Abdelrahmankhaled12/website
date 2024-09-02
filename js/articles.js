import { API_URL, timeSince } from './config.js';

let pagination = 1; // Initialize pagination with a starting value of 1

// Function to fetch articles data from the API and update the UI
function callData() {
    fetch(`${API_URL}articles?page=${pagination}`) // Fetch data from the API for the current page
        .then(response => {
            if (!response.ok) {
                // Handle non-2xx HTTP responses
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse the JSON data from the response
        })
        .then(data => {
            if (data.data.data.length > 0) {
                // Clear existing articles and prepare to display the new ones
                document.getElementById('articles').innerHTML = "";
                document.getElementById('articles').style.display = "grid";

                data.data.data.forEach((item, index) => {
                    // Create a new div element for each article
                    let div = document.createElement("div");
                    div.classList.add("box", "wow", "animate__fadeInUp"); // Add classes for styling and animation

                    // Set the animation duration based on the index
                    div.setAttribute("data-wow-duration", (index % 3) === 0 ? "1.5s" : (index % 3) === 1 ? "2s" : "2.5s");

                    // Set the inner HTML of the div with article data
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

                    // Add an event listener to redirect to the article page when clicked
                    div.addEventListener("click", () => {
                        window.location.href = `article.html?&article=${item.title}&id=${item.id}`;
                    });

                    // Append the newly created div to the articles container
                    document.getElementById("articles").append(div);

                    // Handle pagination controls if more than one page exists
                    if (data.data.last_page > 1) {
                        document.getElementById("ul_controls").innerHTML = ""; // Clear existing pagination controls
                        document.getElementById("controls").style.display = "flex"; // Show the pagination controls

                        // Create and append pagination buttons
                        for (let i = 1; i <= data.data.last_page; i++) {
                            let li = document.createElement("li");
                            if (i === pagination) li.classList.add("active"); // Highlight the current page
                            li.innerHTML = i;
                            document.getElementById("ul_controls").append(li);

                            // Add click event to change page when pagination button is clicked
                            li.addEventListener("click", () => {
                                pagination = i;
                                callData(); // Fetch the data for the selected page
                                window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll to the top of the page
                            });
                        }

                        // Handle "previous page" button click
                        document.getElementById("buttonLeft").addEventListener("click", () => {
                            if (pagination > 1) {
                                pagination--;
                                callData(); // Fetch data for the previous page
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        });

                        // Handle "next page" button click
                        document.getElementById("buttonRight").addEventListener("click", () => {
                            if (pagination < data.data.last_page) {
                                pagination++;
                                callData(); // Fetch data for the next page
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }
                        });
                    } else {
                        document.getElementById("controls").style.display = "none"; // Hide pagination controls if only one page
                    }
                });
            }
        })
        .catch(error => {
            // Handle any errors that occur during the fetch operation
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Initial call to fetch and display the data
callData();

// Fetch additional statistics data from the API and update the UI
fetch(`${API_URL}statistics`)
    .then(response => {
        if (!response.ok) {
            // Handle non-2xx HTTP responses
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json(); // Parse the JSON data from the response
    })
    .then(data => {
        if (data.data.length > 0) {
            // Iterate over the statistics data and display the first 5 items
            data.data.forEach((item, index) => {
                if (index < 5) {
                    // Create a new div element for each statistic item
                    let div = document.createElement("div");
                    div.classList.add("boxShares", item.status === "-" ? "boxDown" : "boxUP"); // Add classes based on status

                    // Set the inner HTML of the div with statistics data
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

                    // Append the newly created div to the categories container
                    document.getElementById("categories").append(div);
                }
            });
        }
    })
    .catch(error => {
        // Handle any errors that occur during the fetch operation
        console.error('There has been a problem with your fetch operation:', error);
    });
