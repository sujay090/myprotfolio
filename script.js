// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Check if Mobile Device
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// Cursor Trail Effect
if (!isMobile) {
    let trailLength = 10;
    let trail = [];

    document.addEventListener('mousemove', (e) => {
        const trailDot = document.createElement('div');
        trailDot.className = 'trail';
        trailDot.style.left = `${e.pageX}px`;
        trailDot.style.top = `${e.pageY}px`;
        document.getElementById('cursor-trail').appendChild(trailDot);

        trail.push(trailDot);
        if (trail.length > trailLength) {
            const oldDot = trail.shift();
            oldDot.remove();
        }

        trail.forEach((dot, index) => {
            dot.style.opacity = 0.7 - (index * 0.05);
            dot.style.transform = `scale(${1 - index * 0.05})`;
        });
    });
}

// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#00ff88' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#00ff88', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: true, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { grab: { distance: 400, line_linked: { opacity: 1 } }, bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 }, repulse: { distance: 200, duration: 0.4 }, push: { particles_nb: 4 }, remove: { particles_nb: 2 } }
    },
    retina_detect: true
});

// Skill Card Particle Burst
if (!isMobile) {
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.className = 'skill-particle';
                const x = Math.random() * card.offsetWidth;
                const y = Math.random() * card.offsetHeight;
                const particleX = (Math.random() - 0.5) * 50;
                const particleY = (Math.random() - 0.5) * 50;
                particle.style.left = `${x}px`;
                particle.style.top = `${y}px`;
                particle.style.setProperty('--particle-x', `${particleX}px`);
                particle.style.setProperty('--particle-y', `${particleY}px`);
                card.appendChild(particle);
                setTimeout(() => particle.remove(), 500);
            }
        });
    });
}

// Project Card Particle Burst
if (!isMobile) {
    const projectCards = document.querySelectorAll('.proj-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            for (let i = 0; i < 10; i++) {
                const particle = document.createElement('div');
                particle.className = 'proj-particle';
                const angle = (i / 10) * 2 * Math.PI;
                const radius = 30;
                const particleX = Math.cos(angle) * radius;
                const particleY = Math.sin(angle) * radius;
                particle.style.left = `${card.offsetWidth / 2}px`;
                particle.style.top = `${card.offsetHeight / 2}px`;
                particle.style.setProperty('--particle-x', `${particleX * 2}px`);
                particle.style.setProperty('--particle-y', `${particleY * 2}px`);
                card.appendChild(particle);
                setTimeout(() => particle.remove(), 700);
            }
        });
    });
}

// Animate Elements on Scroll
const elements = document.querySelectorAll('.skill-card, .proj-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.3 });

elements.forEach(element => observer.observe(element));

// Vanilla Tilt for Cards
if (!isMobile) {
    VanillaTilt.init(document.querySelectorAll('.skill-card, .proj-card'), {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3
    });
}

// Contact Form Submission
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Message sent! (This is a demo alert)');
    e.target.reset();
});