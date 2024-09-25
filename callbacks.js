// Selecting the display area element
const displayText = document.querySelector(".displayText");

// Adding event listener to the button for executing callbacks
document.getElementById('callbackButton').addEventListener('click', () => {
    // Display loader while waiting for callback
    document.getElementById('loader').style.display = 'block';
    // Clear any previous content in displayText
    displayText.innerHTML = '';
    let count = 5;
    // Interval to show countdown before callback execution
    let intervalId = setInterval(() => {
        if (count === 0) {
            clearInterval(intervalId);
        } else {
            displayText.innerHTML = `Callback Executed after ${count} seconds`;
            count--;
        }
    }, 1000);

    // Simulate delay before fetching data and invoking callback
    simulateDelay(5000, () => {
        fetchDataFromAPI(displayData); // Passing displayData as callback function
    });
});

// Function to simulate delay before executing callback
function simulateDelay(delay, callback) {
    setTimeout(callback, delay);
}

// Function to fetch data from API using XMLHttpRequest and invoke callback
function fetchDataFromAPI(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://dummyjson.com/posts');

    xhr.onload = function () {
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            document.getElementById('loader').style.display = 'none'; // Hide loader on successful response
            callback(data.posts); // Invoke callback with fetched data
        } else {
            console.error('Error fetching data:', xhr.statusText); // Log error if fetching fails
        }
    };

    xhr.onerror = function (error) {
        console.error('Error fetching data:', error); // Log error if request encounters an error
    };

    xhr.send(); // Send the XMLHttpRequest
}

// Function to display data in a table format
function displayData(posts) {
    // Creating a new table element dynamically
    const table = document.createElement('table');
    // Populating table headers and rows with fetched data
    table.innerHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Body</th>
            </tr>
        </thead>
        <tbody>
            ${posts.map(post => `
                <tr>
                    <td>${post.id}</td>
                    <td>${post.title}</td>
                    <td>${post.body}</td>
                </tr>
            `).join('')}
        </tbody>
    `;
    displayText.innerHTML = ''; // Clear any previous content in displayText
    displayText.appendChild(table); // Append the created table to displayText
}

// Function to clear displayText content
function clearDisplayText() {
    displayText.innerHTML = '';
}
