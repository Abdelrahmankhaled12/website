let buttonsRA = document.querySelectorAll(".veiwMore")

buttonsRA.forEach((item) => {
    item.addEventListener("click",() => {
        window.location.href = "casestudy.html"
    })
})
