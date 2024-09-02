import { API_URL } from './config.js';


// Get Elements
const dropZone = document.getElementById('image-uploader');
const dropZone2 = document.getElementById('image-uploader2');

const inputFileBox = document.getElementById('imgInputBox');
const inputTitleBox = document.getElementById("inputTitleBox");
const inputDescriptionBox = document.getElementById("inputDescriptionBox");
const inputTitleArticle = document.getElementById("inputTitleArticle");
const browseImageButton = document.getElementById("browseImage");
const browseImageArticleButton = document.getElementById("browseImageArticle");
const imgInputArticle = document.getElementById("imgInputArticle");

const inputWord = document.getElementById("inputWord");

// Storage Values
let boxArticle = {
    titleBoxStorage: "",
    descriptionBoxStorage: "",
    image: ""
};

let images = [];

let content = [];

let additional_info = ""
let sort = 0;

// Handle title input changes
inputTitleBox.addEventListener("input", (e) => {
    const value = e.target.value;
    updateTitle(value);
    boxArticle.titleBoxStorage = value;
});

// Handle description input changes
inputDescriptionBox.addEventListener("input", (e) => {
    const value = e.target.value;
    updateDescription(value);
    boxArticle.descriptionBoxStorage = value;
});

// Ensure the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
    setupFileInput();
    setupDragAndDrop2()
});

// Function to update title elements
const updateTitle = (title) => {
    document.getElementById("headTitleBox").innerHTML = title;
};

// Function to update description elements
const updateDescription = (description) => {
    document.getElementById("descriptionBox").innerHTML = description;
};

// Function to handle drag and drop setup
const setupDragAndDrop = () => {
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
};

const setupDragAndDrop2 = () => {
    dropZone2.addEventListener('dragenter', handleDragEnter);
    dropZone2.addEventListener('dragleave', handleDragLeave);
    dropZone2.addEventListener('dragover', handleDragOver);
    dropZone2.addEventListener('drop', handleDrop);
};

// Function to handle file input setup
const setupFileInput = () => {
    inputFileBox.addEventListener('change', (e) => handleFileChange(e.target.files));
    browseImageButton.addEventListener("click", () => inputFileBox.click());
    browseImageArticleButton.addEventListener("click", () => imgInputArticle.click());
    imgInputArticle.addEventListener('change', (e) => handleFileArticleChange(e.target.files));
};

// Event handlers for drag and drop
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

// Handle file changes
const handleFileChange = (files) => {
    if (files.length > 0) {
        const file = files[0];
        boxArticle.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            document.getElementById("imageBox").src = result;
        };
        reader.readAsDataURL(file);
    }
};


// Handle file changes
const handleFileArticleChange = (files) => {
    if (files.length > 0) {
        const file = files[0];
        images.push({
            image: file,
            sort: sort
        });
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            let div = document.createElement("div")
            div.classList.add("image")

            div.innerHTML =
                `
                    <img src=${result} alt="">
            `
            document.getElementById("aboutArticle").append(div)
        };
        reader.readAsDataURL(file);
        sort++;
    }
};


document.getElementById("addPara").addEventListener("click", () => {

    let div = document.createElement("div")

    let editor = document.querySelector(".ql-editor");
    if (sort === 0) {
        div.classList.add("title")
        div.innerHTML =
            `
            <span>Case Study:</span>
            <h1>${inputTitleArticle.value}</h1>
            <p>${editor.innerHTML}</p>
        `
        content.push({
            title: inputTitleArticle.value,
            body: editor.innerHTML,
            sort: sort,
        })
        document.getElementById("aboutArticle").append(div)
        sort++;
        editor.innerHTML = ""
        inputTitleArticle.value = ""
    } else {
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
            sort: sort,
        })
        document.getElementById("aboutArticle").append(div)
        sort++;
        editor.innerHTML = ""
        inputTitleArticle.value = ""
    }
})

document.getElementById("addWord").addEventListener("click", () => {

    let div = document.createElement("div")


    div.classList.add("paragraph")

    div.innerHTML =
        `
        <div class="bodyParagraph">
            <div class="icon">
                <img src="../assets/Quote.png" alt="">
            </div>
            <p>${inputWord.value}</p>
            <div class="footer">
                <div class="image">
                    <img src="../assets/Img.png" alt="">
                </div>
                <div class="footerText">
                    <h3>William Griffin</h3>
                    <span>Founder and CEO of Agro Company</span>
                </div>
            </div>
        </div>
        `
        sort++;
    additional_info = inputWord.value;
    document.getElementById("aboutArticle").append(div)
    inputWord.value = ""
})


document.getElementById("publishArticle").addEventListener("click", () => {
    Save().then((res) => {
        Swal.fire({
            title: "Published!",
            icon: "success"
        }).then((result) => {
            // window.location.reload()
        });
    })
})

const Save = async () => {

    // Return a Promise to handle asynchronous operations
    return new Promise((resolve, reject) => {
        // Create a new FormData object to store form data
        const formData = new FormData();
        // Append form fields to FormData object
        formData.append('title', boxArticle.titleBoxStorage);
        formData.append('body', boxArticle.descriptionBoxStorage);
        formData.append('background', boxArticle.image);
        formData.append('content', JSON.stringify(content));
        formData.append('type', "case_study");
        formData.append('additional_info', additional_info);

        images.forEach((item, index) => {
            formData.append(`images[${index}][image]`, item.image);
            formData.append(`images[${index}][sort]`, item.sort);
        });


        fetch(API_URL + "articles", {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
                "accept": "application/json"
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