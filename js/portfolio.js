import { API_URL, timeSince } from './config.js';

let pagination = 1;

// DOM Elements
const caseStudiesContainer = document.getElementById('caseStudies');
const ulControls = document.getElementById("ul_controls");
const controlsContainer = document.getElementById("controls");
const buttonLeft = document.getElementById("buttonLeft");
const buttonRight = document.getElementById("buttonRight");

// Function to render case studies
function renderCaseStudies(articles) {
    caseStudiesContainer.innerHTML = ""; // Clear previous articles

    articles.forEach(item => {
        let div = document.createElement("div");
        div.classList.add("box");
        div.innerHTML = `
            <div class="image" style="background-image: url(${item.background});">
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

        // Navigate to detailed view on click
        div.addEventListener("click", () => {
            window.location.href = `casestudy.html?&casestudy=${item.title}&id=${item.id}`;
        });

        // Append article to the container
        caseStudiesContainer.append(div);
    });
}

// Function to render pagination controls
function renderPaginationControls(lastPage) {
    ulControls.innerHTML = ""; // Clear previous pagination controls
    controlsContainer.style.display = lastPage > 1 ? "flex" : "none";

    for (let i = 1; i <= lastPage; i++) {
        let li = document.createElement("li");
        if (i === pagination) {
            li.classList.add("active");
        }
        li.textContent = i;
        ulControls.append(li);

        li.addEventListener("click", () => {
            pagination = i;
            callData();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    buttonLeft.addEventListener("click", () => {
        if (pagination > 1) {
            pagination--;
            callData();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });

    buttonRight.addEventListener("click", () => {
        if (pagination < lastPage) {
            pagination++;
            callData();
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}

// Fetch case studies from the API
function callData() {
    fetch(`${API_URL}case-study?page=${pagination}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.data.data.length > 0) {
                renderCaseStudies(data.data.data);
                renderPaginationControls(data.data.last_page);
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Initial data fetch
callData();
