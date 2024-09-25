// Selecting the displayText element for updating UI
const displayText = document.querySelector(".displayText");

// Adding event listener to asyncButton for click event
document.getElementById('asyncButton').addEventListener('click', async () => {
    // Displaying loader and clearing previous content in displayText
    document.getElementById('loader').style.display = 'block';
    displayText.innerHTML = "";

    // Countdown timer simulation
    let count = 5;
    let intervalId = setInterval(() => {
        if (count === 0) {
            clearInterval(intervalId);
        } else {
            displayText.innerHTML = `Executing in ${count} seconds`;
            count--;
        }
    }, 1000);

    try {
        // Simulating delay with await
        await simulateDelay(5000);

        // Fetching data from API and displaying
        const posts = await fetchDataFromAPI();
        displayData(posts);
    } catch (error) {
        // Handling errors during async operations
        console.error('Error:', error);
        displayText.innerHTML = 'Operation timed out: ' + error.message;
        document.getElementById('loader').style.display = 'none';
    }
});

// Function to simulate delay using setTimeout and Promise
function simulateDelay(delay) {
    return new Promise(resolve => setTimeout(resolve, delay));
}

// Async function to fetch data from API using fetch and await
async function fetchDataFromAPI() {
    try {
        const response = await fetch('https://dummyjson.com/posts');
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        const data = await response.json();
        document.getElementById('loader').style.display = 'none';
        return data.posts;
    } catch (error) {
        // Handling errors during API fetch
        console.error('Error:', error);
        displayText.innerHTML = 'Operation timed out: ' + error.message;
        document.getElementById('loader').style.display = 'none';
    }
}

// Function to display fetched data in a table format
function displayData(posts) {
    // Creating a new table element dynamically
    const table = document.createElement('table');
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

    // Clearing displayText and appending the table
    displayText.innerHTML = '';
    displayText.appendChild(table);
}
