import { API_URL, timeSince } from './config.js';

let pagination = 1;

// Fetch articles from the API and handle the response
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
                document.getElementById('caseStudies').innerHTML = "";
                data.data.data.forEach((item, index) => {
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

                    if (data.data.last_page > 1) {
                        document.getElementById("ul_controls").innerHTML = "";
                        document.getElementById("controls").style.display = "flex";

                        for (let i = 1; i <= data.data.last_page; i++) {
                            let li = document.createElement("li");
                            if (i === pagination)
                                li.classList.add("active");
                            li.innerHTML = i;
                            document.getElementById("ul_controls").append(li);

                            li.addEventListener("click", () => {
                                pagination = i;
                                callData();
                                window.scrollTo({ top: 0, behavior: "smooth" });

                            });
                        }

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
                        document.getElementById("controls").style.display = "none";
                    }


                });
            }
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });

}

callData();