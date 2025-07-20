document.getElementById('driverForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const selectedCheckboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const responseMessage = document.getElementById('responseMessage');
    responseMessage.className = '';
    responseMessage.textContent = '';

    if (selectedCheckboxes.length === 0) {
        responseMessage.textContent = 'Please select at least one driver.';
        responseMessage.classList.add('error');
        return;
    }

    const selectedDriverIds = Array.from(selectedCheckboxes).map(cb => parseInt(cb.value));

    try {
        const response = await fetch('http://localhost:8080/api/assign/batches', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(selectedDriverIds)
        });

        const message = await response.text();
        responseMessage.textContent = message;
        responseMessage.classList.add(response.ok ? 'success' : 'error');
    } catch (error) {
        console.error('Assignment failed:', error);
        responseMessage.textContent = '❌ Assignment failed: ' + error.message;
        responseMessage.classList.add('error');
    }
});
