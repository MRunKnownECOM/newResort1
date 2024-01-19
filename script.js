// Replace 'YOUR_API_KEY' and 'SHEET_ID' with your Ragic API key and sheet ID
const apiKey = 'YOUR_API_KEY';
const sheetId = 'SHEET_ID';
const apiUrl = `https://www.ragic.com/ccn1206/${sheetId}/1`;

const addForm = document.getElementById('addForm');
const dataTable = document.getElementById('dataTable');

// Event listener for form submission
addForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect data from the form
    const fieldName = document.getElementById('fieldName').value;
    // Add more fields as needed

    // Create a new record
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            'Field Name': fieldName,
            // Include more fields as needed
        })
    })
    .then(response => response.json())
    .then(data => {
        // Refresh the data table
        fetchData();
        // Clear the form
        addForm.reset();
    })
    .catch(error => console.error('Error:', error));
});

// Function to fetch data from Ragic
function fetchData() {
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        }
    })
    .then(response => response.json())
    .then(data => {
        // Clear existing rows
        dataTable.getElementsByTagName('tbody')[0].innerHTML = '';

        // Populate the table with data
        data.forEach(record => {
            const row = dataTable.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = record['Field Name'];
            // Add more cells as needed
        });
    })
    .catch(error => console.error('Error:', error));
}

// Initial data fetch
fetchData();