import { API_URL } from './config.js';

let pagination = 1; // Initialize pagination variable

// Function to fetch articles from the API and handle the response
function callData() {
    fetch(`${API_URL}articles?page=${pagination}`)
        .then(response => {
            // Check if the network response is successful
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json(); // Parse response as JSON
        })
        .then(data => {
            const articles = data.data.data; // Extract articles from the response
            const articlesContainer = document.getElementById("articles");
            const noArticlesMessage = document.getElementById("noArticlesAdd");

            // Check if there are articles to display
            if (articles.length > 0) {
                articlesContainer.style.display = "grid";
                noArticlesMessage.style.display = "none";
                articlesContainer.innerHTML = ""; // Clear the articles container

                // Loop through the articles and create HTML elements for each one
                articles.forEach((item) => {
                    let div = document.createElement("div");
                    div.classList.add("box");
                    div.innerHTML = `
                        <div class="image">
                            <img src="${item.background}" alt="">
                        </div>
                        <div class="text">
                            <div class="logo">
                                <img src="../assets/logo.png" alt="">
                            </div>
                            <h2>${item.title}</h2>
                            <p>${item.body}</p>
                        </div>
                        <button class="delete" id="${item.id}">
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    `;

                    // Append the article div to the container
                    articlesContainer.append(div);

                    // Add event listener to the delete button for each article
                    document.getElementById(item.id).addEventListener("click", () => {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "Are you sure you want to delete this article?",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                                // Send DELETE request to the API
                                fetch(`${API_URL}articles/${item.id}`, {
                                    method: 'DELETE',
                                    headers: {
                                        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
                                    },
                                }).then(response => {
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok ' + response.statusText);
                                    }
                                    return response.json();
                                }).then(() => {
                                    // Show confirmation message and reload the page
                                    Swal.fire({
                                        title: "Deleted!",
                                        text: "Your article has been deleted.",
                                        icon: "success"
                                    }).then(() => {
                                        window.location.reload();
                                    });
                                }).catch(error => {
                                    console.error('There has been a problem with your fetch operation:', error);
                                });
                            }
                        });
                    });
                });
            } else {
                // If no articles, show the no articles message and hide the articles container
                articlesContainer.style.display = "none";
                noArticlesMessage.style.display = "flex";
            }

            // Handle pagination controls
            if (data.data.last_page > 1) {
                const controlsContainer = document.getElementById("controls");
                const ulControls = document.getElementById("ul_controls");

                ulControls.innerHTML = ""; // Clear the pagination controls
                controlsContainer.style.display = "flex";

                // Create pagination controls
                for (let i = 1; i <= data.data.last_page; i++) {
                    let li = document.createElement("li");
                    if (i === pagination) {
                        li.classList.add("active");
                    }
                    li.textContent = i;
                    ulControls.append(li);

                    // Add click event to each pagination item
                    li.addEventListener("click", () => {
                        pagination = i;
                        callData();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    });
                }

                // Add event listeners for the left and right pagination buttons
                document.getElementById("buttonLeft").addEventListener("click", () => {
                    if (pagination > 1) {
                        pagination--;
                        callData();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                });

                document.getElementById("buttonRight").addEventListener("click", () => {
                    if (pagination < data.data.last_page) {
                        pagination++;
                        callData();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                });
            } else {
                // If there's only one page, hide the pagination controls
                document.getElementById("controls").style.display = "none";
            }
        })
        .catch(error => {
            // Log any errors that occur during the fetch operation
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Call the function to fetch data when the page loads
callData();
