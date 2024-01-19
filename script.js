const apiKey = 'SWZHMWtJZmZncnNJV1M2WkJ6NHAwc2hDd2ZSejRCaGdpZFcyZFA5ZDFOZ3ZSUDhhd3YvS2QxK3Z0WkJZckZlNzBwTW5SZEtuL2NvPQ==';
const sheetId = 'demo';
const apiUrl = `	https://sea1.ragic.com/resortBase/demo/2`;

const addForm = document.getElementById('addForm');
const dataTable = document.getElementById('dataTable');

addForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const idCardNumber = document.getElementById('idCardNumber').value;
    const phoneNumber = document.getElementById('phoneNumber').value;
    const email = document.getElementById('email').value;
    const daysStayed = document.getElementById('daysStayed').value;

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            'Name': name,
            'ID Card Number': idCardNumber,
            'Phone Number': phoneNumber,
            'Email Address': email,
            'Days Stayed': daysStayed
        })
    })
    .then(response => response.json())
    .then(data => {
        fetchData();
        addForm.reset();
    })
    .catch(error => console.error('Error:', error));
});

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
        dataTable.getElementsByTagName('tbody')[0].innerHTML = '';

        data.forEach(record => {
            const row = dataTable.insertRow();
            const nameCell = row.insertCell(0);
            const idCardNumberCell = row.insertCell(1);
            const phoneNumberCell = row.insertCell(2);
            const emailCell = row.insertCell(3);
            const daysStayedCell = row.insertCell(4);

            nameCell.textContent = record['Name'];
            idCardNumberCell.textContent = record['ID Card Number'];
            phoneNumberCell.textContent = record['Phone Number'];
            emailCell.textContent = record['Email Address'];
            daysStayedCell.textContent = record['Days Stayed'];
        });
    })
    .catch(error => console.error('Error:', error));
}

fetchData();
