// Get Buttons => (read article)
let buttonsRA = document.querySelectorAll(".readArticle")

buttonsRA.forEach((item) => {
    item.addEventListener("click",() => {
        window.location.href = "../article.html"
    })
})

