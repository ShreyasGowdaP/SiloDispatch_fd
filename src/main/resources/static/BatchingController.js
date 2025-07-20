document.getElementById('generateBtn').addEventListener('click', async function () {
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.className = '';
    responseMessage.textContent = 'Generating...';

    try {
        const response = await fetch('http://localhost:8080/api/batching/generate', {
            method: 'POST'
        });

        const message = await response.text();
        responseMessage.textContent = message;
        responseMessage.classList.add(response.ok ? 'success' : 'error');
    } catch (error) {
        console.error('Batch generation failed:', error);
        responseMessage.textContent = '❌ Failed to generate batches: ' + error.message;
        responseMessage.classList.add('error');
    }
});
