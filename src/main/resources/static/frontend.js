// CSV Upload
document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('csvFile');
    const responseMsg = document.getElementById('uploadResponse');
    responseMsg.className = 'response';
    responseMsg.textContent = '';

    const file = fileInput.files[0];
    if (!file) {
        responseMsg.textContent = 'Please select a file.';
        responseMsg.classList.add('error');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://localhost:8080/api/orders/upload', {
            method: 'POST',
            body: formData
        });
        const message = await response.text();
        responseMsg.textContent = message;
        responseMsg.classList.add(response.ok ? 'success' : 'error');
    } catch (err) {
        responseMsg.textContent = 'Upload failed: ' + err.message;
        responseMsg.classList.add('error');
    }
});

// Batch Generation
document.getElementById('generateBtn').addEventListener('click', async function () {
    const responseMsg = document.getElementById('batchResponse');
    responseMsg.className = 'response';
    responseMsg.textContent = 'Generating...';

    try {
        const response = await fetch('http://localhost:8080/api/batching/generate', {
            method: 'POST'
        });
        const message = await response.text();
        responseMsg.textContent = message;
        responseMsg.classList.add(response.ok ? 'success' : 'error');
    } catch (err) {
        responseMsg.textContent = 'Batch generation failed: ' + err.message;
        responseMsg.classList.add('error');
    }
});

// Driver Assignment
document.getElementById('driverForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const checkboxes = document.querySelectorAll('#driverList input[type="checkbox"]:checked');
    const responseMsg = document.getElementById('assignResponse');
    responseMsg.className = 'response';
    responseMsg.textContent = '';

    if (checkboxes.length === 0) {
        responseMsg.textContent = 'Select at least one driver.';
        responseMsg.classList.add('error');
        return;
    }

    const driverIds = Array.from(checkboxes).map(cb => parseInt(cb.value));

    try {
        const response = await fetch('http://localhost:8080/api/assign/batches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(driverIds)
        });
        const message = await response.text();
        responseMsg.textContent = message;
        responseMsg.classList.add(response.ok ? 'success' : 'error');
    } catch (err) {
        responseMsg.textContent = 'Assignment failed: ' + err.message;
        responseMsg.classList.add('error');
    }
});
