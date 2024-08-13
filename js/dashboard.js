import { API_URL } from './config.js';

let pagination = 1;

// Function to fetch articles from the API and handle the response
function callData() {
    fetch(`${API_URL}articles?page=${pagination}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const articles = data.data.data;

            document.getElementById("totalArticles").innerHTML = data.data.total;

            if (articles.length > 0) {
                document.getElementById("articles").style.display = "grid";
                document.getElementById("noArticlesAdd").style.display = "none";
                document.getElementById("articles").innerHTML = "";

                articles.forEach((item) => {
                    let div = document.createElement("div");
                    div.classList.add("box");
                    div.innerHTML = `
                        <div class="image">
                            <img src=${item.background} alt="">
                        </div>
                        <div class="text">
                            <div class="logo">
                                <img src="../assets/logo.png" alt="">
                            </div>
                            <h2>${item.title}</h2>
                            <p>${item.body}</p>
                        </div>
                        <button class="delete" id=${item.id}>
                            <i class="fa-solid fa-xmark"></i>
                        </button>
                    `;

                    // Append the div to the articles container
                    document.getElementById("articles").append(div);

                    // Add event listener to delete the article
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
                document.getElementById("articles").style.display = "none";
                document.getElementById("noArticlesAdd").style.display = "block";
            }

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
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

// Call the function to fetch data when the page loads
callData();
