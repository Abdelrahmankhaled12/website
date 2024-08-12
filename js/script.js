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

document.addEventListener("DOMContentLoaded", function () {
    // Execute the following code after a delay of 5000 milliseconds (5 seconds)
    setTimeout(() => {
        // Initialize the WOW.js library for animating elements
        new WOW().init();
        // Hide the loader element after 5 seconds
        document.getElementById("loader").style.display = "none";
        // Hide the effect element after 5 seconds
        document.getElementById("effect").style.display = "none";
        // Show the sections element after 5 seconds
        document.getElementById("sections").style.display = "block";
        // Otherwise, hide the buttonScroll
        buttonScroll.style.opacity = "0";
    }, 2000); // 2000 milliseconds = 2 seconds
});


if (document.getElementById("GetInTouchButton")) {
    document.getElementById("GetInTouchButton").addEventListener("click", function () {
        // Remove the 'showMenuMobile' class from the 'menuMobile' element when 'buttonClose' button is clicked
        const section = document.getElementById("getInTouch");
        // Check if the "section" element exists
        if (section) {
            // Get the distance between the top of the "section" element and the top of the viewport
            const distanceToTop = section.getBoundingClientRect().top;
            // Check if the absolute value of the distance is less than 100 pixels
            if (Math.abs(distanceToTop) < 100) {
                // If the section is already within 100 pixels, simply scroll smoothly to the top of the section
                section.scrollIntoView({ behavior: 'smooth' });
            } else {
                // If the section is more than 100 pixels away, scroll smoothly to bring the section to the top of the viewport
                window.scrollBy({
                    top: distanceToTop - 100, // Subtracting 100 pixels to ensure it's less than 100 pixels away
                    behavior: 'smooth'
                });
            }
        }
    });
}

