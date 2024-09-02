import { API_URL } from './config.js';

const inputTitle = document.getElementById('inputTitle');
const inputCountry = document.getElementById("inputCountry");
const inputOldPrice = document.getElementById("inputOldPrice");
const inputNewPrice = document.getElementById("inputNewPrice");


document.getElementById("publishCategory").addEventListener("click", () => {
    Save().then((res) => {
        Swal.fire({
            title: "Published!",
            icon: "success"
        }).then((result) => {
            window.location.reload()
        });
    })
})

const Save = async () => {

    // Return a Promise to handle asynchronous operations
    return new Promise((resolve, reject) => {
        // Create a new FormData object to store form data
        const formData = new FormData();
        // Append form fields to FormData object
        formData.append('title', inputTitle.value);
        formData.append('country', inputCountry.value);
        formData.append('statistic', inputOldPrice.value);
        formData.append('new_statistic', inputNewPrice.value);

        fetch(API_URL + "statistics", {
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

fetch(`${API_URL}statistics`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.data.length > 0) {
            data.data.forEach((item, index) => {
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
                    <p>Old Price : <span>${item.statistic}$</span></p>
                </div>
                <div class="price">
                    <p>Now Price : <span>${item.new_statistic}$</span></p>
                </div>
                <div class="update">
                    <input id="inputUpdate${item.id}" type="text" placeholder="Update Price" name="" id="">
                    <button class="updateButton${item.id}">Update Price</button>
                </div>
                <button id=${item.id} class="remove"><i class="fa-solid fa-trash"></i></button>
                `;

                document.getElementById("categories").append(div);

                document.querySelector(`.updateButton${item.id}`).addEventListener("click", () => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Are you sure you want to Updated this Category?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, Updated it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            // Create a new FormData object to store form data
                            const formData = new FormData();
                            // Append form fields to FormData object
                            formData.append('statistic', document.getElementById(`inputUpdate${item.id}`).value);
                            formData.append('_method', "PUT");

                            fetch(`${API_URL}statistics/${item.id}`, {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
                                },
                                body:formData
                            }).then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok ' + response.statusText);
                                }
                                return response.json();
                            }).then(() => {
                                Swal.fire({
                                    title: "Update!",
                                    text: "Your category has been Updated.",
                                    icon: "success"
                                }).then(() => {
                                    window.location.reload();
                                });
                            }).catch(error => {
                                console.error('There has been a problem with your fetch operation:', error);
                            });
                        }
                    });

                });

                document.getElementById(item.id).addEventListener("click", () => {
                    Swal.fire({
                        title: "Are you sure?",
                        text: "Are you sure you want to delete this Category?",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, delete it!"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            fetch(`${API_URL}statistics/${item.id}`, {
                                method: 'DELETE',
                                headers: {
                                    Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token"))}`,
                                },
                            }).then(response => {
                                if (!response.ok) {
                                    throw new Error('Network response was not ok ' + response.statusText);
                                }
                                return response.json();
                            }).then(() => {
                                Swal.fire({
                                    title: "Deleted!",
                                    text: "Your category has been deleted.",
                                    icon: "success"
                                }).then(() => {
                                    window.location.reload();
                                });
                            }).catch(error => {
                                console.error('There has been a problem with your fetch operation:', error);
                            });
                        }
                    });

                });
            })
        }
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });

