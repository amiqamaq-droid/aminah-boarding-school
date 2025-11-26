// Function untuk memastikan halaman di scroll ke atas saat pertama kali load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);
});

// Navbar scroll effect
/*
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});
*/

const navbar = document.getElementById('navbar');
if(navbar) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// --- Fungsionalitas Mobile Menu ---
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const navBar = document.getElementById('navbar');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Non-aktifkan scrolling body saat menu aktif
    if (navLinks.classList.contains('active')) {
        document.body.style.overflow = 'hidden'; 
    } else {
        document.body.style.overflow = ''; 
    }
});

// Menutup menu saat link diklik (di mobile)
navLinks.querySelectorAll('a').forEach(link => {
    // Pastikan hanya berlaku untuk link yang mengarah ke ID section (hash)
    if (link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            document.body.style.overflow = ''; 
        });
    }
});
// -----------------------------------

// Animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target); // Hentikan observasi setelah animasi muncul
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.program-card, .facility-card, .keunggulan-item, .contact-card, .stat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});