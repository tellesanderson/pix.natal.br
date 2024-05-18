document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    const images = slider.querySelectorAll('img');
    let currentIndex = 0;

    setInterval(() => {
        images[currentIndex].style.transform = 'translateX(-100%)';
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].style.transform = 'translateX(0)';
    }, 3000);
});
