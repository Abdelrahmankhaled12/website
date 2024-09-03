import { API_URL } from './config.js'; // Import the API URL from the configuration file

// Get elements from the DOM
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

// Storage values
let boxArticle = {
    titleBoxStorage: "",
    descriptionBoxStorage: "",
    image: ""
};

let images = []; // Array to store uploaded images
let content = []; // Array to store content for the article
let additional_info = ""; // Additional information
let sort = 0; // Counter for sorting images and content

// Handle changes in the title input field
inputTitleBox.addEventListener("input", (e) => {
    const value = e.target.value;
    updateTitle(value); // Update the displayed title
    boxArticle.titleBoxStorage = value; // Store the title in the object
});

// Handle changes in the description input field
inputDescriptionBox.addEventListener("input", (e) => {
    const value = e.target.value;
    updateDescription(value); // Update the displayed description
    boxArticle.descriptionBoxStorage = value; // Store the description in the object
});

// Ensure the DOM is fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    setupDragAndDrop(); // Set up drag and drop for the first drop zone
    setupFileInput(); // Set up file input elements
    setupDragAndDrop2(); // Set up drag and drop for the second drop zone
});

// Function to update the title elements on the page
const updateTitle = (title) => {
    document.getElementById("headTitleBox").innerHTML = title;
};

// Function to update the description elements on the page
const updateDescription = (description) => {
    document.getElementById("descriptionBox").innerHTML = description;
};

// Function to set up drag and drop for the first drop zone
const setupDragAndDrop = () => {
    dropZone.addEventListener('dragenter', handleDragEnter);
    dropZone.addEventListener('dragleave', handleDragLeave);
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
};

// Function to set up drag and drop for the second drop zone
const setupDragAndDrop2 = () => {
    dropZone2.addEventListener('dragenter', handleDragEnter);
    dropZone2.addEventListener('dragleave', handleDragLeave);
    dropZone2.addEventListener('dragover', handleDragOver);
    dropZone2.addEventListener('drop', handleDrop);
};

// Function to set up file input elements
const setupFileInput = () => {
    inputFileBox.addEventListener('change', (e) => handleFileChange(e.target.files)); // Handle file changes for the first input
    browseImageButton.addEventListener("click", () => inputFileBox.click()); // Trigger file input click
    browseImageArticleButton.addEventListener("click", () => imgInputArticle.click()); // Trigger file input click for article images
    imgInputArticle.addEventListener('change', (e) => handleFileArticleChange(e.target.files)); // Handle file changes for article images
};

// Event handler for drag enter event
const handleDragEnter = (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over'); // Add visual feedback for drag over
};

// Event handler for drag leave event
const handleDragLeave = (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over'); // Remove visual feedback for drag leave
};

// Event handler for drag over event
const handleDragOver = (e) => {
    e.preventDefault();
};

// Event handler for drop event
const handleDrop = (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over'); // Remove visual feedback for drop
    const files = e.dataTransfer.files;
    handleFileChange(files); // Handle the dropped files
};

// Function to handle file changes for the first input
const handleFileChange = (files) => {
    if (files.length > 0) {
        const file = files[0];
        boxArticle.image = file; // Store the file in the object
        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target.result;
            document.getElementById("imageBox").src = result; // Display the image on the page
        };
        reader.readAsDataURL(file); // Read the file as a Data URL
    }
};

// Function to handle file changes for article images
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
            document.getElementById("aboutArticle").append(div); // Add the image to the page
        };
        reader.readAsDataURL(file);
        sort++; // Increment the sort counter
    }
};

// Add a new paragraph to the article
document.getElementById("addPara").addEventListener("click", () => {
    let div = document.createElement("div");
    let editor = document.querySelector(".ql-editor");

    if (sort === 0) {
        div.classList.add("title");
        div.innerHTML = `
            <span>Case Study:</span>
            <h1>${inputTitleArticle.value}</h1>
            <p>${editor.innerHTML}</p>
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
    } else {
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
    }
});

// Add a paragraph containing a quote
document.getElementById("addWord").addEventListener("click", () => {
    let div = document.createElement("div");
    div.classList.add("paragraph");
    div.innerHTML = `
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
                    <span>Founder and CEO of Agro Company</span>
                </div>
            </div>
        </div>
    `;
    sort++;
    additional_info = inputWord.value; // Store the quote
    document.getElementById("aboutArticle").append(div);
    inputWord.value = ""; // Clear the input field
});

// Publish the article
document.getElementById("publishArticle").addEventListener("click", () => {
    Save().then((res) => {
        Swal.fire({
            title: "Published!",
            icon: "success"
        }).then((result) => {
            window.location.reload(); // Reload the page after publishing
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
                // Check if the response status is OK
                if (!response.ok) {
                    // If not OK, throw an error
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                // If OK, parse the response as JSON
                return response.json();
            })
            .then(data => {
                // Resolve the promise with the parsed JSON data
                resolve(data);
            })
            .catch(error => {
                // If an error occurs, reject the promise with the error
                reject(error);
            });
    });
};
