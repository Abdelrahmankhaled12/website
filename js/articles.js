import { API_URL , timeSince } from './config.js';

let pagination = 1;

// Fetch articles from the API and handle the response
function callData () {
    fetch(`${API_URL}articles?page=${pagination}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.data.data.length > 0) {
            document.getElementById('articles').innerHTML = "";
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
                            <span>${timeSince(item.created_at)}</span>
                            <img src="./assets/pages.png" alt="">
                            </span>
                        </div>
                    </div>
                `;

                
                div.addEventListener("click", () => {
                    window.location.href = `article.html?&article=${item.title}&id=${item.id}`
                })

                // Append div to the carousel container
                document.getElementById("articles").append(div);

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