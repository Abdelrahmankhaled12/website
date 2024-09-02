
import { API_URL, timeSince } from './config.js';

const searchParams = new URLSearchParams(location.search);


fetch(API_URL + `articles/${searchParams.get('id')}`)
    .then(response => {
        if (response.status === 404) {
            window.location.href = "articles.html"
        }
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        let additional_info = false;

        data.data.content.sort((a, b) => a.sort - b.sort).forEach((item, index) => {
            let div = document.createElement("div")
            console.log(item.sort + " ******* " + index)


            if (item.sort === 0) {
                div.classList.add("title")
                div.innerHTML =
                    `
                    <span>Case Study:</span>
                    <h1>${item.title}</h1>
                    <p>${item.body}</p>
                `
            } else {
                if (additional_info || index === item.sort) {
                    if (item.image) {
                        div.classList.add("image")
                        div.innerHTML =
                            `
                                <img src=${item.image} alt="">
                        `
                    } else {
                        div.classList.add("text")
                        div.innerHTML =
                            `
                        ${item.title === "" ? "" : `<h1> ${item.title}</h1>`}
                        <div class="body">
                        ${item.body}
                        </div>
                        `
                    }
                } else {
                    additional_info = true;
                    div.classList.add("paragraph")
                    div.innerHTML =
                        `
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
                                    <span>Founder and CEO of Agro Company</span>
                                </div>
                            </div>
                        </div>
                        `
                }
            }
            document.getElementById("partOne").append(div)
        })

    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });


// fetch(API_URL + "articles")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Network response was not ok ' + response.statusText);
//         }
//         return response.json();
//     })
//     .then(data => {
//         if (data.data.data.length > 0) {
//             data.data.data.forEach((item, index) => {
//                 let div = document.createElement("div");
//                 div.classList.add("box");
//                 div.innerHTML = `
//                     <div class="image">
//                         <img src=${item.background} alt="">
//                     </div>
//                     <div class="text">
//                         <div class="logo">
//                             <img src="./assets/logo.png" alt="">
//                         </div>
//                         <h2>${item.title}</h2>
//                         <p>${item.body}</p>
//                         <div class="footer">
//                             <a href="article.html?&article=${item.title}&id=${item.id}" class="readArticle">
//                                 <p>Read article</p>
//                                 <i class="fa-solid fa-chevron-right"></i>
//                             </a>
//                             <span>
//                                 <span>${timeSince(item.created_at)}</span>
//                                 <img src="./assets/pages.png" alt="">
//                             </span>
//                         </div>
//                     </div>
//                 `;

//                 div.addEventListener("click", () => {
//                     window.location.href = `article.html?&article=${item.title}&id=${item.id}`
//                 })

//                 // Append clones of the div to different groups
//                 if (index <= 2) {
//                     document.getElementById("groupOne").append(div.cloneNode(true));
//                 }
//                 if (index > 2 && index < 6) {
//                     document.getElementById("groupTwo").append(div.cloneNode(true));
//                 }

//                 // Append div to the carousel container
//                 document.getElementById("carouselContainerBoxesDesktop").append(div);
//             });

//             // Add event listeners for carousel navigation


//             const buttonArrowLeft = document.querySelectorAll(".arrowLeft");
//             const buttonArrowRight = document.querySelectorAll(".arrowRight");


//             buttonArrowLeft.forEach((button) => {
//                 button.addEventListener("click", () => { navigation("left") })
//             })

//             buttonArrowRight.forEach((button) => {
//                 button.addEventListener("click", () => { navigation("right") })
//             })

//         }
//     })
//     .catch(error => {
//         console.error('There has been a problem with your fetch operation:', error);
//     });



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
                    document.getElementById("categories").append(div);
                }
            })
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

















































// const buttonArrowLeft = document.getElementById("arrowLeft");
// const buttonArrowRight = document.getElementById("arrowRight");

// buttonArrowLeft.addEventListener("click", () => { navigation("left") })
// buttonArrowRight.addEventListener("click", () => { navigation("right") })


// // Function to handle carousel navigation
// const navigation = (dir) => {
//     const containers = document.querySelectorAll(".carouselContainerBoxes"); // Getting reference to carousel container

//     containers.forEach((container) => {
//         // Calculating scroll amount based on direction
//         const scrollAmount =
//             dir === "left"
//                 ? container.scrollLeft - (container.offsetWidth + 5)
//                 : container.scrollLeft + (container.offsetWidth + 5);
//         // Smooth scrolling to the calculated scroll amount
//         container.scrollTo({
//             left: scrollAmount,
//             behavior: "smooth",
//         });
//     })

// };