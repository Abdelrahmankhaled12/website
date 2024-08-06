// Select all elements with the class 'viewMore'
let viewMoreButtons = document.querySelectorAll(".viewMore");

// Iterate over each selected element
viewMoreButtons.forEach((button) => {
    // Add a click event listener to each element
    button.addEventListener("click", () => {
        // Redirect the user to 'casestudy.html' when the element is clicked
        window.location.href = "casestudy.html";
    });
});
