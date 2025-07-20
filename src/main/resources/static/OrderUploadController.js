document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('csvFile');
    const file = fileInput.files[0];
    const responseMessage = document.getElementById('responseMessage');

    if (!file) {
        responseMessage.textContent = 'Please select a file.';
        responseMessage.style.color = 'red';
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
        responseMessage.textContent = message;
        responseMessage.style.color = response.ok ? 'green' : 'red';
    } catch (error) {
        console.error('Upload failed:', error);
        responseMessage.textContent = '❌ Upload failed: ' + error.message;
        responseMessage.style.color = 'red';
    }
});
