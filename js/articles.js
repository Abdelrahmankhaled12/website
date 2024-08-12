import { API_URL } from './config.js';


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
            document.getElementById('articles').style.display = "grid";
            data.data.data.forEach((item, index) => {
                let div = document.createElement("div");
                div.classList.add("box", "wow", "animate__fadeInUp");
                div.setAttribute("data-wow-duration", (index % 3) === 0 ? "1.5s" : (index % 3) === 1 ? "2s" : "2.5s")
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
                                <span>Posted 1 day ago</span>
                                <img src="./assets/pages.png" alt="">
                            </span>
                        </div>
                    </div>
                `;
                // Append div to the carousel container
                document.getElementById("articles").append(div);
            });
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
