const loveLetter = `Dear My Love, My Heart, and My Everything,
Happy Birthday to the one who makes my world brighter every single day. I want you to know that no candle could ever shine as brightly as you do in my life
Today i celebrate you, not only the day you were born, but also the countless ways you make my life worth living.

I Love You So Much, My Love,
Alfian Agung`;

const openButton = document.getElementById('open-button');
const envelope = document.getElementById('envelope');
const pageContainer = document.getElementById('page-container');
const typingTextElement = document.getElementById('typing-text');
const romanticSong = document.getElementById('romantic-song');

const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');
const closeModal = document.getElementsByClassName('close-modal')[0];

const cursor = document.getElementById('cursor');

let currentPage = 0;

function createPetals() {
    const petalContainer = document.getElementById('petal-container');
    const petalCount = 50;

    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        petalContainer.appendChild(petal);
    }
}

function startTypingEffect() {
    let i = 0;
    const speed = 40;
    const cursor = document.createElement('span');
    cursor.classList.add('typing-cursor');
    typingTextElement.appendChild(cursor);

    const typeWriter = () => {
        if (i < loveLetter.length) {
            typingTextElement.textContent += loveLetter.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        } else {
            cursor.remove();
            setTimeout(() => {
                swipePage(1);
                if (romanticSong.paused) {
                    romanticSong.play().catch(e => console.log('Autoplay blocked:', e));
                }
            }, 2000);
        }
    };
    typeWriter();
}

function createStarSparkles() {
    const starCount = 30;
    const page3 = document.querySelector('.page-3');
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('span');
        star.classList.add('star-sparkle');
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDelay = `${Math.random() * 5}s`;
        page3.appendChild(star);
    }
}

function swipePage(direction) {
    currentPage += direction;
    if (currentPage < 0) currentPage = 0;
    if (currentPage > 2) currentPage = 2;

    if (window.matchMedia("(orientation: landscape)").matches) {
        pageContainer.style.transform = `translateX(-${currentPage * 100}vw)`;
    } else {
        pageContainer.style.transform = `translateY(-${currentPage * 100}vh)`;
    }

    if (currentPage === 2) {
        createStarSparkles();
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.style.animationDelay = `${Math.random() * 0.5}s`;
            item.style.animationName = 'fade-in-scale';
        });
    }
}

openButton.addEventListener('click', () => {
    openButton.disabled = true;
    openButton.textContent = 'Membuka...';
    envelope.classList.add('open');
    setTimeout(() => {
        swipePage(1);
        startTypingEffect();
    }, 1000);
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' && currentPage < 2) {
        swipePage(1);
    } else if (e.key === 'ArrowLeft' && currentPage > 0) {
        swipePage(-1);
    }
});

document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImage.src = item.dataset.src;
        modalImage.alt = item.dataset.alt;
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

function createHeartSparkle(x, y) {
    const heart = document.createElement('span');
    heart.classList.add('heart-sparkle');
    heart.innerHTML = '❤️';
    heart.style.left = `${x}px`;
    heart.style.top = `${y}px`;
    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}

document.addEventListener('mousemove', (e) => {
    createHeartSparkle(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
    for (let i = 0; i < e.touches.length; i++) {
        createHeartSparkle(e.touches[i].clientX, e.touches[i].clientY);
    }
});

window.addEventListener('load', () => {
    createPetals();
});