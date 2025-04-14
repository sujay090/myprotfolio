// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

if (hamburger && navLinks) {
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".navbar")) {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    }
  });
}

// Check if Mobile Device
const isMobile = window.matchMedia("(max-width: 768px)").matches;

// Cursor Trail Effect
if (!isMobile) {
  const cursorTrail = document.getElementById("cursor-trail");
  if (cursorTrail) {
    let trailLength = 10;
    let trail = [];

    const createTrailDot = (x, y) => {
      const trailDot = document.createElement("div");
      trailDot.className = "trail";
      trailDot.style.left = `${x}px`;
      trailDot.style.top = `${y}px`;
      return trailDot;
    };

    const updateTrail = (e) => {
      const trailDot = createTrailDot(e.pageX, e.pageY);
      cursorTrail.appendChild(trailDot);
      trail.push(trailDot);

      if (trail.length > trailLength) {
        const oldDot = trail.shift();
        oldDot.remove();
      }

      trail.forEach((dot, index) => {
        dot.style.opacity = 0.7 - index * 0.05;
        dot.style.transform = `scale(${1 - index * 0.05})`;
      });
    };

    // Throttle the mousemove event for better performance
    let throttleTimeout;
    document.addEventListener("mousemove", (e) => {
      if (!throttleTimeout) {
        throttleTimeout = setTimeout(() => {
          updateTrail(e);
          throttleTimeout = null;
        }, 16); // ~60fps
      }
    });
  }
}

// Particles.js Configuration
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: "#00ff88" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#00ff88",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 2,
        direction: "none",
        random: true,
        straight: false,
        out_mode: "out",
        bounce: false,
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "repulse" },
        onclick: { enable: true, mode: "push" },
        resize: true,
      },
      modes: {
        grab: { distance: 400, line_linked: { opacity: 1 } },
        bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });
}

// Particle Effects
const createParticleEffect = (container, className, count, duration) => {
  if (!container) return;

  const createParticle = () => {
    const particle = document.createElement("div");
    particle.className = className;
    const x = Math.random() * container.offsetWidth;
    const y = Math.random() * container.offsetHeight;
    const particleX = (Math.random() - 0.5) * 50;
    const particleY = (Math.random() - 0.5) * 50;
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    particle.style.setProperty("--particle-x", `${particleX}px`);
    particle.style.setProperty("--particle-y", `${particleY}px`);
    return particle;
  };

  for (let i = 0; i < count; i++) {
    const particle = createParticle();
    container.appendChild(particle);
    setTimeout(() => particle.remove(), duration);
  }
};

// Initialize particle effects for skill and project cards
if (!isMobile) {
  const skillCards = document.querySelectorAll(".skill-card");
  const projectCards = document.querySelectorAll(".proj-card");

  skillCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      createParticleEffect(card, "skill-particle", 5, 500);
    });
  });

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      createParticleEffect(card, "proj-particle", 10, 700);
    });
  });
}

// Initialize Vanilla Tilt for Skills Cards (only on desktop)
if (!isMobile && typeof VanillaTilt !== "undefined") {
  VanillaTilt.init(document.querySelectorAll(".skill-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3,
  });
}

// Animate Skills Cards on Scroll
const skillCards = document.querySelectorAll(".skill-card");
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
        const progress = entry.target.querySelector(".progress");
        if (progress) {
          progress.style.width = progress.style.getPropertyValue("--progress");
        }
      }
    });
  },
  { threshold: 0.2 }
);

skillCards.forEach((card) => skillObserver.observe(card));

// Add hover effect for skill cards (only on desktop)
if (!isMobile) {
  skillCards.forEach((card) => {
    const cardInner = card.querySelector(".card-inner");
    if (cardInner) {
      card.addEventListener("mouseenter", () => {
        cardInner.style.transform = "rotateY(180deg)";
      });

      card.addEventListener("mouseleave", () => {
        cardInner.style.transform = "rotateY(0deg)";
      });
    }
  });
}

// Contact Form Submission
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const formProps = Object.fromEntries(formData);

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just show a success message
      alert("Message sent successfully! I'll get back to you soon.");
      contactForm.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("There was an error sending your message. Please try again later.");
    }
  });
}

// Initialize Swiper
let skillsSwiper;

const initSkillsSwiper = () => {
  const skillsSwiperContainer = document.querySelector(".skills-swiper");

  if (!skillsSwiperContainer) return;

  if (window.innerWidth <= 768) {
    if (!skillsSwiper) {
      skillsSwiper = new Swiper(".skills-swiper", {
        slidesPerView: "auto",
        spaceBetween: 15,
        centeredSlides: false,
        grabCursor: true,
        loop: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
          320: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 2.2,
            spaceBetween: 15,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 15,
          },
        },
      });
    }
  } else if (skillsSwiper) {
    skillsSwiper.destroy();
    skillsSwiper = undefined;
  }
};

// Initialize on page load
document.addEventListener("DOMContentLoaded", initSkillsSwiper);

// Reinitialize on window resize with debounce
let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(initSkillsSwiper, 250);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
