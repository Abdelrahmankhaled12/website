import { API_URL } from './config.js';

// Get Elements
const dropZone = document.getElementById('image-uploader');
const dropZone2 = document.getElementById('image-uploader2');
const inputFileBox = document.getElementById('imgInputBox');
const inputTitleBox = document.getElementById("inputTitleBox");
const inputTitleArticle = document.getElementById("inputTitleArticle");
const browseImageButton = document.getElementById("browseImage");
const browseImageArticleButton = document.getElementById("browseImageArticle");
const imgInputArticle = document.getElementById("imgInputArticle");

// Storage Values
let boxArticle = {
    titleBoxStorage: "",
    descriptionBoxStorage: "",
    image: ""
};

let images = [];
let content = [];
let sort = 0;

// Event listener for title input changes
inputTitleBox.addEventListener("input", (e) => {
    const value = e.target.value;
    updateTitle(value);
    boxArticle.titleBoxStorage = value;
});

// Event listener for description input changes
inputDescriptionBox.addEventListener("input", (e) => {
    const value = e.target.value;
    updateDescription(value);
    boxArticle.descriptionBoxStorage = value;
});

// Ensure the DOM content is fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop();
    setupFileInput();
    setupDragAndDrop2();
});

// Function to update title elements
const updateTitle = (title) => {
    document.getElementById("headTitleBox").innerHTML = title;
    document.getElementById("titleArticleTop").innerHTML = title;
};

// Function to update description elements
const updateDescription = (description) => {
    document.getElementById("descriptionBox").innerHTML = description;
    document.getElementById("descriptionArticleTop").innerHTML = description;
};

// Function to set up drag and drop functionality for the first drop zone
const setupDragAndDrop = () => {
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
};

// Function to set up drag and drop functionality for the second drop zone
const setupDragAndDrop2 = () => {
    dropZone2.addEventListener('dragenter', handleDragEnter);
    dropZone2.addEventListener('dragleave', handleDragLeave);
    dropZone2.addEventListener('dragover', handleDragOver);
    dropZone2.addEventListener('drop', handleDrop);
};

// Function to set up file input functionality
const setupFileInput = () => {
    inputFileBox.addEventListener('change', (e) => handleFileChange(e.target.files));
    browseImageButton.addEventListener("click", () => inputFileBox.click());
    browseImageArticleButton.addEventListener("click", () => imgInputArticle.click());
    imgInputArticle.addEventListener('change', (e) => handleFileArticleChange(e.target.files));
};

// Event handler for drag enter event
const handleDragEnter = (e) => {
    e.preventDefault();
    e.target.classList.add('drag-over');
};

// Event handler for drag leave event
const handleDragLeave = (e) => {
    e.preventDefault();
    e.target.classList.remove('drag-over');
};

// Event handler for drag over event
const handleDragOver = (e) => {
    e.preventDefault();
};

// Event handler for drop event
const handleDrop = (e) => {
    e.preventDefault();
    e.target.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    handleFileChange(files);
};

// Handle file changes for the main image
const handleFileChange = (files) => {
    if (files.length > 0) {
        const file = files[0];
        boxArticle.image = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            document.getElementById("imageBox").src = result;
            document.getElementById("imgArticle").src = result;
        };
        reader.readAsDataURL(file);
    }
};

// Handle file changes for additional article images
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
            let div = document.createElement("div");
            div.classList.add("image");
            div.innerHTML = `<img src=${result} alt="">`;
            document.getElementById("aboutArticle").append(div);
        };
        reader.readAsDataURL(file);
        sort++;
    }
};

// Event listener for adding a new paragraph
document.getElementById("addPara").addEventListener("click", () => {
    let div = document.createElement("div");
    let editor = document.querySelector(".ql-editor");
    div.classList.add("text");
    div.innerHTML = `
        <h1>${inputTitleArticle.value}</h1>
        <div class="body">${editor.innerHTML}</div>
    `;
    content.push({
        title: inputTitleArticle.value,
        body: editor.innerHTML,
        sort: sort,
    });
    document.getElementById("aboutArticle").append(div);
    sort++;
    editor.innerHTML = "";
    inputTitleArticle.value = "";
});

// Event listener for publishing the article
document.getElementById("publishArticle").addEventListener("click", () => {
    Save().then((res) => {
        Swal.fire({
            title: "Published!",
            icon: "success"
        }).then((result) => {
            window.location.reload();
        });
    });
});

// Function to save the article
const Save = async () => {
    return new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('title', boxArticle.titleBoxStorage);
        formData.append('body', boxArticle.descriptionBoxStorage);
        formData.append('background', boxArticle.image);
        formData.append('content', JSON.stringify(content));
        formData.append('type', "article");

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
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
};
