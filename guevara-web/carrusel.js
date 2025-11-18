const slides = document.querySelectorAll('.slide');
let index = 0;

function mostrar(i) {
    slides.forEach((s, j) => s.classList.toggle('active', j === i));
}

document.querySelector('.sig').onclick = () => {
    index = (index + 1) % slides.length;
    mostrar(index);
};

document.querySelector('.ant').onclick = () => {
    index = (index - 1 + slides.length) % slides.length;
    mostrar(index);
};
