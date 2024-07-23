let buttonsRA = document.querySelectorAll(".veiwMore")

buttonsRA.forEach((item) => {
    item.addEventListener("click",() => {
        window.location.href = "casestudy.html"
    })
})


// Get Buttons => (read article)
let buttonsR = document.querySelectorAll(".readArticle")

buttonsR.forEach((item) => {
    item.addEventListener("click",() => {
        window.location.href = "article.html"
    })
})


const buttonArrowLeft = document.getElementById("arrowLeft");
const buttonArrowRight = document.getElementById("arrowRight");

buttonArrowLeft.addEventListener("click", () => { navigation("left") })
buttonArrowRight.addEventListener("click", () => { navigation("right") })


// Function to handle carousel navigation
const navigation = (dir) => {
    const container = document.getElementById("carouselContainer"); // Getting reference to carousel container
    console.log(container)
    // Calculating scroll amount based on direction
    const scrollAmount =
        dir === "left"
            ? container.scrollLeft - (container.offsetWidth + 8)
            : container.scrollLeft + (container.offsetWidth + 8);

    // Smooth scrolling to the calculated scroll amount
    container.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
    });
};