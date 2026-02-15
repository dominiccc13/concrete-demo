const modal = document.getElementById('modal');
const modalFailed = document.getElementById('modal-failed');
const modalBtns = document.querySelectorAll('.modal-btn');
modalBtns.forEach(modalBtn => {
    modalBtn.addEventListener('click', () => { modal.style.display = 'none'; modalFailed.style.display = 'none'; })
});
const form = document.getElementById('estimate-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:3000/get-estimate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            modal.style.display = 'block';
            form.reset(); 
        } else {
            modalFailed.style.display = 'block';
        }
    } catch (error) {
        console.error("Network error:", error);
    }
});