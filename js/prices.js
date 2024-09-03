import { API_URL } from './config.js';

// Get Elements
const inputTitle = document.getElementById('inputTitle');
const inputCountry = document.getElementById("inputCountry");
const inputOldPrice = document.getElementById("inputOldPrice");
const inputNewPrice = document.getElementById("inputNewPrice");

// Event listener for the publish button
document.getElementById("publishCategory").addEventListener("click", () => {
    Save().then((res) => {
        Swal.fire({
            title: "Published!",
            icon: "success"
        }).then(() => {
            window.location.reload();
        });
    });
});

// Function to save the category data
const Save = async () => {
    // Create and populate a FormData object
    const formData = new FormData();
    formData.append('title', inputTitle.value);
    formData.append('country', inputCountry.value);
    formData.append('statistic', inputOldPrice.value);
    formData.append('new_statistic', inputNewPrice.value);

    // Send a POST request to save the data
    return fetch(API_URL + "statistics", {
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
    .catch(error => {
        console.error('Error during fetch operation:', error);
        throw error;
    });
};

// Fetch and display the categories
fetch(`${API_URL}statistics`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.data.length > 0) {
            data.data.forEach((item) => {
                // Create a new div element for each category
                let div = document.createElement("div");
                div.classList.add("category");
                div.innerHTML = `
                <div class="boxShares ${item.status === "-" ? "boxDown" : "boxUP"}">
                    <div class="box">
                        <i class="fa-solid fa-arrow-up-long"></i>
                        <p>${item.percentage.toFixed(2)}%</p>
                    </div>
                    <div class="text">
                        <p>${item.title}</p>
                        <span>${item.country}</span>
                    </div>
                </div>
                <div class="price">
                    <p>Old Price: <span>${item.statistic}$</span></p>
                </div>
                <div class="price">
                    <p>Now Price: <span>${item.new_statistic}$</span></p>
                </div>
                <div class="update">
                    <input id="inputUpdate${item.id}" type="text" placeholder="Update Price">
                    <button class="updateButton${item.id}">Update Price</button>
                </div>
                <button id=${item.id} class="remove"><i class="fa-solid fa-trash"></i></button>
                `;

                document.getElementById("categories").append(div);

                // Event listener for the update button
                document.querySelector(`.updateButton${item.id}`).addEventListener("click", () => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Are you sure you want to update this category?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, update it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Create and populate a FormData object for the update
                            const formData = new FormData();
                            formData.append('statistic', document.getElementById(`inputUpdate${item.id}`).value);
                            formData.append('_method', "PUT");

                            // Send a POST request to update the data
                            fetch(`${API_URL}statistics/${item.id}`, {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
                                },
                                body: formData
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok ' + response.statusText);
                                }
                                return response.json();
                            })
                            .then(() => {
                                Swal.fire({
                                    title: "Updated!",
                                    text: "Your category has been updated.",
                                    icon: "success"
                                }).then(() => {
                                    window.location.reload();
                                });
                            })
                            .catch(error => {
                                console.error('Error during fetch operation:', error);
                            });
                        }
                    });
                });

                // Event listener for the delete button
                document.getElementById(item.id).addEventListener("click", () => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Are you sure you want to delete this category?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Send a DELETE request to remove the category
                            fetch(`${API_URL}statistics/${item.id}`, {
                                method: 'DELETE',
                                headers: {
                                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
                                },
                            })
                            .then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok ' + response.statusText);
                                }
                                return response.json();
                            })
                            .then(() => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your category has been deleted.",
                                    icon: "success"
                                }).then(() => {
                                    window.location.reload();
                                });
                            })
                            .catch(error => {
                                console.error('Error during fetch operation:', error);
                            });
                        }
                    });
                });
            });
        }
    })
    .catch(error => {
        console.error('Error during fetch operation:', error);
    });
