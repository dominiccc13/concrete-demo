const scrollBtns = document.querySelectorAll('.scroll-btn');
const estimateSection = document.getElementById('estimate-container');

scrollBtns.forEach(scrollBtn => {
    scrollBtn.addEventListener('click', (e) => {
        e.preventDefault();
        estimateSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// document.addEventListener('DOMContentLoaded', () => {
//     const observerOptions = {
//         threshold: 0.15
//     };

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            console.log("Element visible!");
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
});

document.querySelectorAll('.reveal').forEach((workCon) => observer.observe(workCon));
// })


const galleryImgs = document.querySelectorAll('.gallery-img');

galleryImgs.forEach(img => {
    img.addEventListener('click', (e) => {
        // window.location.href = '/our-work';
        console.log(e);
    });
});

const form = document.getElementById('estimate-form');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('/get-estimate', {
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
        modalFailed.style.display = 'block';
        modalError.innerText = error;
    }
});

const modal = document.getElementById('modal');
const modalFailed = document.getElementById('modal-failed');
const modalError = document.getElementById('modal-error');
const modalBtns = document.querySelectorAll('.modal-btn');
modalBtns.forEach(modalBtn => {
    modalBtn.addEventListener('click', () => { modal.style.display = 'none'; modalFailed.style.display = 'none'; })
});