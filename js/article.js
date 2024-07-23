

const buttonArrowLeft = document.getElementById("arrowLeft");
const buttonArrowRight = document.getElementById("arrowRight");

buttonArrowLeft.addEventListener("click", () => { navigation("left") })
buttonArrowRight.addEventListener("click", () => { navigation("right") })


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