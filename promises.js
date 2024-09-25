// Selecting the display area where text and table will be shown
const displayText = document.querySelector(".displayText");

// Adding event listener to the button for fetching data
document.getElementById('promiseButton').addEventListener('click', () => {
    // Displaying loader while data is fetched
    document.getElementById('loader').style.display = 'block';

    // Setting initial text and countdown
    displayText.innerHTML = "";
    let count = 5;
    let intervalId = setInterval(() => {
        if (count === 0) {
            clearInterval(intervalId);
        } else {
            displayText.innerHTML = `Loading in ${count} seconds`;
            count--;
        }
    }, 1000);

    // Simulating delay using a promise
    simulateDelay(5000)
        // Fetching data from API using fetch API
        .then(fetchDataFromAPI)
        // Displaying fetched data
        .then(displayData)
        // Handling errors
        .catch(error => {
            console.error('Error:', error);
            displayText.innerHTML = 'Operation timed out: ' + error.message;
            document.getElementById('loader').style.display = 'none';
        });
});

// Function to simulate delay using a promise
function simulateDelay(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Function to fetch data from API using fetch API
function fetchDataFromAPI() {
    return fetch('https://dummyjson.com/posts')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error fetching data: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Hiding loader after data is fetched
            document.getElementById('loader').style.display = 'none';
            return data.posts; // Returning posts from fetched data
        });
}

// Function to display data in a table format
function displayData(posts) {
    // Creating a table element dynamically
    const table = document.createElement('table');
    // Setting up table structure with header and body rows
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
    // Clearing display text area and appending the table
    displayText.innerHTML = '';
    displayText.appendChild(table);
}
