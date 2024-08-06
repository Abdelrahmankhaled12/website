// Get all buttons with the class 'readArticle'
let readArticleButtons = document.querySelectorAll(".readArticle");

// Iterate over each button
readArticleButtons.forEach((button) => {
    // Add a click event listener to each button
    button.addEventListener("click", () => {
        // Redirect the user to 'article.html' when the button is clicked
        window.location.href = "article.html";
    });
});