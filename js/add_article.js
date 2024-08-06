const KEY = "https://talkwebnow.online/backend/api/";

// Get Elements
const dropZone = document.getElementById('image-uploader');

const inputFile = document.getElementById('imgInput');

const inputTitleBox = document.getElementById("inputTitleBox");

const inputDescriptionBox = document.getElementById("inputDescriptionBox");

const inputTitleArticle = document.getElementById("inputTitleArticle");


// Storage Values

let boxArticle = {
    titleBoxStorage: "",
    descriptionBoxStorage: "",
    image: ""
}

let content = []

inputTitleBox.addEventListener("input", (e) => {
    document.getElementById("headTitleBox").innerHTML = e.target.value;
    document.getElementById("titleArticleTop").innerHTML = e.target.value;
    boxArticle.titleBoxStorage = e.target.value;
})


inputDescriptionBox.addEventListener("input", (e) => {
    document.getElementById("descriptionBox").innerHTML = e.target.value;
    document.getElementById("descriptionArticleTop").innerHTML = e.target.value;
    boxArticle.descriptionBoxStorage = e.target.value;
})


document.addEventListener('DOMContentLoaded', () => {
    const handleDragEnter = (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');

        const files = e.dataTransfer.files;
        handleFileChange(files);
    };

    const handleFileChange = (files) => {
        boxArticle.image = files[0];
        if (files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                document.getElementById("imageBox").src = e.target.result;
                document.getElementById("imgArticle").src = e.target.result;
            };
            reader.readAsDataURL(files[0]);
        }
    };

    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    inputFile.addEventListener('change', (e) => handleFileChange(e.target.files));
    document.getElementById("imgInputArticle").addEventListener('change', (e) => handleFileChange(e.target.files));

});

document.getElementById("browseImage").addEventListener("click", () => {
    inputFile.click()
})

document.getElementById("browseImageArticle").addEventListener("click", () => {
    document.getElementById("imgInputArticle").click()
})



document.getElementById("addPara").addEventListener("click", () => {

    let div = document.createElement("div")

    let editor = document.querySelector(".ql-editor");

    div.classList.add("text")

    div.innerHTML =
        `
    <h1>${inputTitleArticle.value}</h1>
    <div class="body">
    ${editor.innerHTML}
    </div>
    `
    content.push({
        title: inputTitleArticle.value,
        body: editor.innerHTML,
        sort: 1,
    })
    document.getElementById("aboutArticle").append(div)
})


document.getElementById("publishArticle").addEventListener("click", () => {
    Save().then((res) => {
        console.log(res)
    })
})

const Save = async () => {

    console.log( boxArticle.image)

    // Return a Promise to handle asynchronous operations
    return new Promise((resolve, reject) => {
        // Create a new FormData object to store form data
        const formData = new FormData();
        // Append form fields to FormData object
        formData.append('title', boxArticle.titleBoxStorage);
        formData.append('body', boxArticle.descriptionBoxStorage);
        formData.append('background', boxArticle.image);

        fetch("https://talkwebnow.online/backend/api/articles", {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                // Check if response status is OK
                if (!response.ok) {
                    // If response status is not OK, throw an error
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // If response status is OK, parse response as JSON
                return response.json();
            })
            .then(data => {
                // Resolve the Promise with parsed JSON data
                resolve(data);
            })
            .catch(error => {
                // If an error occurs during the fetch operation, reject the Promise with the error
                reject(error);
            });
    });
};