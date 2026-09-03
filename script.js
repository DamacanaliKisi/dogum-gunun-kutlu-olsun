const bgShapes = document.getElementById('bg-shapes');
const fullscreenBtn = document.getElementById('fullscreen-btn');
const app = document.getElementById('app');
const intro = document.getElementById('intro');
const questionScreen = document.getElementById('question-screen');
const popup = document.getElementById('popup');
const celebrationScreen = document.getElementById('celebration-screen');
const noBtn = document.getElementById('no-btn');
const yesBtn = document.getElementById('yes-btn');
const music1 = document.getElementById('music1');
const music2 = document.getElementById('music2');
const loadingScreen = document.getElementById('loading-screen');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

let isCelebrating = false;
let noClickCount = 0;

const noMessages = ['ı-ıh!', 'hmph!', 'grrr!', 'hayır!', 'olmaz!', 'boşuna!'];
const popupMessages = [
    'yalan söyleme (˶˃⤙˂˶)',
    'biliyorum öyle değil (˶˃ᆺ˂˶)',
    'kabul et artık (˶˃⤙˂˶)',
    'hadi ama (˶˃ᆺ˂˶)'
];

function createShapes() {
    const count = 12;
    for (let i = 0; i < count; i++) {
        const shape = document.createElement('div');
        shape.classList.add('shape');
        const size = Math.random() * 40 + 30;
        shape.style.width = size + 'px';
        shape.style.height = size + 'px';
        shape.style.left = Math.random() * 100 + '%';
        shape.style.animationDuration = Math.random() * 8 + 6 + 's';
        shape.style.animationDelay = Math.random() * 5 + 's';
        bgShapes.appendChild(shape);
    }
}

function toggleConfettiShapes() {
    const shapes = document.querySelectorAll('.shape');
    shapes.forEach(shape => {
        shape.classList.toggle('confetti');
        if (shape.classList.contains('confetti')) {
            shape.style.background = `hsl(${Math.random() * 360}, 70%, 80%)`;
            shape.style.width = Math.random() * 20 + 10 + 'px';
            shape.style.height = Math.random() * 20 + 10 + 'px';
        } else {
            shape.style.background = 'var(--bg-dark)';
            const size = Math.random() * 40 + 30;
            shape.style.width = size + 'px';
            shape.style.height = size + 'px';
        }
    });
}

function fadeAudio(audio, targetVolume, duration, callback) {
    const startVolume = audio.volume;
    const startTime = performance.now();
    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        audio.volume = startVolume + (targetVolume - startVolume) * progress;
        if (progress < 1) {
            requestAnimationFrame(step);
        } else if (callback) {
            callback();
        }
    }
    requestAnimationFrame(step);
}

function playMusic1() {
    music1.volume = 0;
    music1.play().catch(() => {});
    fadeAudio(music1, 0.6, 1500);
}

function playMusic2() {
    music2.volume = 0;
    music2.play().catch(() => {});
    fadeAudio(music2, 0.6, 800);
}

function stopMusic1() {
    fadeAudio(music1, 0, 1200, () => {
        music1.pause();
        music1.currentTime = 0;
    });
}

function showFullscreenBtn() {
    if (!document.fullscreenElement) {
        fullscreenBtn.classList.add('visible');
    } else {
        fullscreenBtn.classList.remove('visible');
    }
}

fullscreenBtn.addEventListener('click', () => {
    document.documentElement.requestFullscreen().catch(() => {});
    fullscreenBtn.classList.remove('visible');
    if (!isCelebrating) {
        startExperience();
    }
});

document.addEventListener('fullscreenchange', showFullscreenBtn);

function startExperience() {
    if (isCelebrating) return;
    playMusic1();
    showIntro();
}

function showIntro() {
    intro.classList.remove('hidden');
    const introText = intro.querySelector('.intro-text');
    const ownerImg = intro.querySelector('.owner-img');
    ownerImg.style.opacity = '0';
    introText.style.opacity = '0';
    introText.style.transform = 'translateY(-20px)';
    ownerImg.style.transform = 'scale(0.8)';

    requestAnimationFrame(() => {
        ownerImg.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        introText.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        ownerImg.style.opacity = '1';
        ownerImg.style.transform = 'scale(1)';
        introText.style.opacity = '1';
        introText.style.transform = 'translateY(0)';
    });

    setTimeout(() => {
        hideIntro();
    }, 2000);

    intro.addEventListener('click', hideIntro, { once: true });
}

function hideIntro() {
    const introText = intro.querySelector('.intro-text');
    const ownerImg = intro.querySelector('.owner-img');
    introText.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    ownerImg.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    introText.style.opacity = '0';
    introText.style.transform = 'translateY(30px)';
    ownerImg.style.opacity = '0';
    ownerImg.style.transform = 'translateY(30px)';

    setTimeout(() => {
        intro.classList.add('hidden');
        showQuestion();
    }, 1000);
}

function showQuestion() {
    questionScreen.classList.remove('hidden');
    const questionBox = questionScreen.querySelector('.question-box');
    const buttons = questionScreen.querySelector('.buttons');
    questionBox.style.opacity = '0';
    questionBox.style.transform = 'translateY(20px)';
    buttons.style.opacity = '0';
    buttons.style.transform = 'translateY(20px)';

    requestAnimationFrame(() => {
        questionBox.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        buttons.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        questionBox.style.opacity = '1';
        questionBox.style.transform = 'translateY(0)';
        buttons.style.opacity = '1';
        buttons.style.transform = 'translateY(0)';
    });
}

function teleportNoButton() {
    const btnRect = noBtn.getBoundingClientRect();
    const startX = btnRect.left + btnRect.width / 2;
    const startY = btnRect.top + btnRect.height / 2;

    noBtn.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
    noBtn.style.transform = 'scale(0)';
    noBtn.style.opacity = '0';

    setTimeout(() => {
        const maxX = window.innerWidth - btnRect.width - 20;
        const maxY = window.innerHeight - btnRect.height - 20;
        const newX = Math.random() * maxX;
        const newY = Math.random() * maxY;

        noBtn.style.position = 'fixed';
        noBtn.style.left = newX + 'px';
        noBtn.style.top = newY + 'px';
        noBtn.style.margin = '0';
        noBtn.style.transform = 'scale(0)';
        noBtn.style.opacity = '0';

        requestAnimationFrame(() => {
            noBtn.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            noBtn.style.transform = 'scale(1)';
            noBtn.style.opacity = '1';
        });
    }, 300);
}

function showFloatingText() {
    const text = noMessages[noClickCount % noMessages.length];
    const el = document.createElement('div');
    el.classList.add('floating-text');
    el.textContent = text;
    const x = Math.random() * (window.innerWidth - 100) + 50;
    const y = Math.random() * (window.innerHeight - 100) + 50;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.setProperty('--dx', (Math.random() * 60 - 30) + 'px');
    el.style.setProperty('--dy', (Math.random() * -60 - 20) + 'px');
    el.style.setProperty('--rot', (Math.random() * 10 - 5) + 'deg');
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1300);
}

function showPopup() {
    popup.classList.remove('hidden');
    const popupBox = popup.querySelector('.popup-box');
    popupBox.textContent = popupMessages[noClickCount % popupMessages.length];
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 1500);
}

noBtn.addEventListener('click', () => {
    noClickCount++;
    showPopup();
    teleportNoButton();
    showFloatingText();
});

function showBlurMessage(message, duration = 1000) {
    return new Promise(resolve => {
        const overlay = document.createElement('div');
        overlay.classList.add('blur-overlay');
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('active'));

        const msg = document.createElement('div');
        msg.classList.add('center-message');
        msg.textContent = message;
        document.body.appendChild(msg);
        requestAnimationFrame(() => msg.classList.add('visible'));

        setTimeout(() => {
            msg.classList.remove('visible');
            overlay.classList.remove('active');
            setTimeout(() => {
                msg.remove();
                overlay.remove();
                resolve();
            }, 400);
        }, duration);
    });
}

yesBtn.addEventListener('click', async () => {
    if (isCelebrating) return;
    isCelebrating = true;

    const questionBox = questionScreen.querySelector('.question-box');
    const buttons = questionScreen.querySelector('.buttons');
    questionBox.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    buttons.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    questionBox.style.opacity = '0';
    questionBox.style.transform = 'translateY(30px)';
    buttons.style.opacity = '0';
    buttons.style.transform = 'translateY(30px)';

    setTimeout(async () => {
        questionScreen.classList.add('hidden');
        await showBlurMessage('harika!', 1000);
        await showBlurMessage('tanışalı daha birkaç gün oldu..', 1000);
        await showBlurMessage('senin hakkında daha çok şey bilseydim daha fazla sorular sorabilirdim.', 1000);
        await showBlurMessage('aklıma başka birşey gelmedi :/', 1000);
        await showBlurMessage('neyse, konuyu uzatmayalım :P', 1000);
        stopMusic1();
        setTimeout(() => {
            playMusic2();
            toggleConfettiShapes();
            setTimeout(showCelebration, 1000);
        }, 1000);
    }, 1000);
});

function showCelebration() {
    celebrationScreen.classList.remove('hidden');
    const items = celebrationScreen.querySelectorAll('.celebration-content > *');
    items.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 200);
    });
}

async function loadResource(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const contentLength = +response.headers.get('Content-Length');
    const reader = response.body.getReader();
    const chunks = [];
    let receivedLength = 0;

    while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        receivedLength += value.length;
        if (contentLength > 0) {
            const percent = Math.round((receivedLength / contentLength) * 100);
            updateProgress(percent);
        }
    }

    const blob = new Blob(chunks, { type: response.headers.get('Content-Type') || 'audio/mpeg' });
    return URL.createObjectURL(blob);
}

function updateProgress(percent) {
    progressBar.style.width = percent + '%';
    progressText.textContent = '%' + percent;
}

async function preloadAll() {
    try {
        const [music1Url, music2Url] = await Promise.all([
            loadResource('./files/music/1.mp3'),
            loadResource('./files/music/2.mp3')
        ]);
        music1.src = music1Url;
        music2.src = music2Url;
        loadingScreen.classList.add('hidden');
        createShapes();
        if (!document.fullscreenElement) {
            showFullscreenBtn();
        } else {
            startExperience();
        }
    } catch (err) {
        console.error('Yükleme hatası:', err);
        loadingScreen.classList.add('hidden');
        createShapes();
        showFullscreenBtn();
    }
}

window.addEventListener('load', () => {
    preloadAll();
});

document.addEventListener('click', () => {
    if (!document.fullscreenElement && !isCelebrating && loadingScreen.classList.contains('hidden')) {
        document.documentElement.requestFullscreen().catch(() => {});
        fullscreenBtn.classList.remove('visible');
        startExperience();
    }
}, { once: true });
