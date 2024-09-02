import { API_URL, timeSince } from './config.js';

// Select the buttonScroll element
let buttonScroll = document.querySelector(".buttonScroll");

// Event handler for window scroll event
window.onscroll = function () {
    // If the vertical scroll position is greater than or equal to 400 pixels
    if (window.scrollY >= 400) {
        // Make the buttonScroll visible
        buttonScroll.style.opacity = "1";
    } else {
        // Otherwise, hide the buttonScroll
        buttonScroll.style.opacity = "0";
    }
};

// Event handler for window click event
window.onclick = function () {
    // Event handler for buttonScroll click event
    buttonScroll.onclick = function () {
        // Scroll to the top of the page smoothly when buttonScroll is clicked
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
};

// Event listener for 'showMenu' button click event
document.getElementById("showMenu").addEventListener("click", function () {
    // Add the 'showMenuMobile' class to the 'menuMobile' element when 'showMenu' button is clicked
    document.getElementById("menuMobile").classList.add("showMenuMobile");
});

// Event listener for 'buttonClose' button click event
document.getElementById("buttonClose").addEventListener("click", function () {
    // Remove the 'showMenuMobile' class from the 'menuMobile' element when 'buttonClose' button is clicked
    document.getElementById("menuMobile").classList.remove("showMenuMobile");
});

// Event listener for 'outMenu' button click event
document.getElementById("outMenu").addEventListener("click", function () {
    // Remove the 'showMenuMobile' class from the 'menuMobile' element when 'outMenu' button is clicked
    document.getElementById("menuMobile").classList.remove("showMenuMobile");
});

// Initialize WOW.js and hide specific elements on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
    // Hide the effect element after 5 seconds
    document.getElementById("effect").style.display = "none";
    // Hide the buttonScroll initially
    buttonScroll.style.opacity = "0";
});

// Smooth scroll to 'getInTouch' section when 'GetInTouchButton' is clicked
document.getElementById("GetInTouchButton").addEventListener("click", function () {
    const section = document.getElementById("getInTouch");
    if (section) {
        const distanceToTop = section.getBoundingClientRect().top;
        if (Math.abs(distanceToTop) < 100) {
            section.scrollIntoView({ behavior: 'smooth' });
        } else {
            window.scrollBy({
                top: distanceToTop - 100,
                behavior: 'smooth'
            });
        }
    }
});

// Fetch articles from the API and handle the response
fetch(API_URL + "articles")
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.data.data.length > 0) {
            document.getElementById('sectionThree').style.display = "block";
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

                div.addEventListener("click", () => {
                    window.location.href = `article.html?&article=${item.title}&id=${item.id}`
                })

                // Append clones of the div to different groups
                if (index <= 2) {
                    document.getElementById("groupOne").append(div.cloneNode(true));
                }
                if (index > 2 && index < 6) {
                    document.getElementById("groupTwo").append(div.cloneNode(true));
                }

                // Append div to the carousel container
                document.getElementById("carouselContainerBoxesDesktop").append(div);
            });

            // Add event listeners for carousel navigation
            const buttonArrowLeft = document.getElementById("arrowLeft");
            const buttonArrowRight = document.getElementById("arrowRight");

            buttonArrowLeft.addEventListener("click", () => { navigation("left") });
            buttonArrowRight.addEventListener("click", () => { navigation("right") });
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

// Redirect to case study page on view more button click
let buttonsRA = document.querySelectorAll(".veiwMore");

buttonsRA.forEach((item) => {
    item.addEventListener("click", () => {
        window.location.href = "casestudy.html";
    });
});

// Function to handle carousel navigation
const navigation = (dir) => {
    const containers = document.querySelectorAll(".carouselContainerBoxes");
    containers.forEach((container) => {
        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 5)
                : container.scrollLeft + (container.offsetWidth + 5);
        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    });
};


fetch(`${API_URL}case-study`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.data.data.length > 0) {
            document.getElementById('caseStudies').innerHTML = "";
            data.data.data.forEach((item, index) => {
                if (index < 2) {
                    let div = document.createElement("div");
                    div.classList.add("box");
                    div.innerHTML = `
                                <div class="image">
                                <img src="./assets/portfolio.png" alt="">
                            </div>
                            <div class="text">
                                <div class="top">
                                    <div class="info">
                                        <div class="logo">
                                            <img src="./assets/logo.png" alt="logo">
                                        </div>
                                        <div class="textInfo">
                                            <p>AGRO</p>
                                            <span>${timeSince(item.created_at)}</span>
                                        </div>
                                    </div>
                                    <div class="icons">
                                        <i class="fa-solid fa-share-nodes"></i>
                                        <i class="fa-regular fa-bookmark"></i>
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div class="body">
                                    <h3>${item.title}</h3>
                                    <p>${item.body}</p>
                                </div>
                                <button class="viewMore">
                                    <span>View more</span>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                            `;
                    div.addEventListener("click", () => {
                        window.location.href = `casestudy.html?&casestudy=${item.title}&id=${item.id}`
                    })

                    // Append div to the carousel container
                    document.getElementById("caseStudies").append(div);
                }

                if (index < 3) {
                    let div = document.createElement("div");
                    div.classList.add("box");
                    div.innerHTML = `
                                <div>
                                <div class="top">
                                    <div class="info">
                                        <div class="logo">
                                            <img src="./assets/logo.png" alt="logo">
                                        </div>
                                        <div class="textInfo">
                                            <p>AGRO</p>
                                            <span>${timeSince(item.created_at)}</span>
                                        </div>
                                    </div>
                                    <div class="icons">
                                        <i class="fa-solid fa-share-nodes"></i>
                                        <i class="fa-regular fa-bookmark"></i>
                                        <i class="fa-solid fa-ellipsis"></i>
                                    </div>
                                </div>
                                <div class="text">
                                    <h2>${item.title}</h2>
                                    <p>${item.body}</p>
                                    <button class="seeMore">
                                        <span>See more</span>
                                        <i class="fa-solid fa-chevron-right"></i>
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div class="image">
                                    <img src="./assets/portfolio.png" alt="">
                                </div>
                                <button class="veiwMoreProject">
                                    <span>View more</span>
                                    <i class="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                            `;
                    div.addEventListener("click", () => {
                        window.location.href = `casestudy.html?&casestudy=${item.title}&id=${item.id}`
                    })

                    // Append div to the carousel container
                    document.getElementById("projects").append(div);
                }

            });
        }
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
        if (data.data.length > 0) {
            data.data.forEach((item, index) => {
                if (index < 2) {
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
                    document.getElementById("boxesSearch").append(div);
                }
            })
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

