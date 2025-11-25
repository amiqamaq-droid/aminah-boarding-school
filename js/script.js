// ========================================
// AMINAH BOARDING SCHOOL - COMPLETE JS
// ========================================

// Function untuk memastikan halaman di scroll ke atas saat pertama kali load
window.addEventListener('load', function() {
    setTimeout(function() {
        window.scrollTo(0, 0);
    }, 0);
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

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

// ========================================
// MOBILE MENU
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
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
}

// ========================================
// ANIMATION ON SCROLL
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
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

// ========================================
// LIGHTBOX GALLERY FOR FACILITIES
// ========================================

// Data fasilitas dengan path gambar
const facilities = [
    {
        img: 'assets/images/gedung-asrama.png',
        title: 'Gedung Asrama',
        description: 'Asrama nyaman dan bersih untuk seluruh santri dengan fasilitas lengkap'
    },
    {
        img: 'assets/images/islamic-center.png',
        title: 'Masjid Islamic Center',
        description: 'Pusat kegiatan ibadah dan pembelajaran dengan arsitektur megah'
    },
    {
        img: 'assets/images/hero-pesantren.png',
        title: 'Gedung Sekolah',
        description: 'Ruang kelas modern dan nyaman dengan teknologi pembelajaran terkini'
    },
    {
        img: 'assets/images/perpustakaan.jpg',
        title: 'Perpustakaan',
        description: 'Koleksi buku lengkap untuk menunjang pembelajaran dan riset santri'
    }
];

// Cek apakah elemen lightbox ada
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const counter = document.getElementById('counter');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Hanya jalankan jika semua elemen lightbox ada
if (lightbox && lightboxImg && lightboxCaption && counter && closeBtn && prevBtn && nextBtn) {
    let currentIndex = 0;

    // Open lightbox saat facility card diklik
    document.querySelectorAll('.facility-card').forEach((card, index) => {
        card.addEventListener('click', () => {
            currentIndex = index;
            openLightbox();
        });
    });

    function openLightbox() {
        lightbox.classList.add('active');
        updateLightbox();
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateLightbox() {
        const facility = facilities[currentIndex];
        lightboxImg.src = facility.img;
        lightboxCaption.innerHTML = `<strong>${facility.title}</strong><br>${facility.description}`;
        counter.textContent = `${currentIndex + 1} / ${facilities.length}`;
        
        // Fallback jika gambar tidak ditemukan
        lightboxImg.onerror = function() {
            this.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 600'%3E%3Crect fill='%230a5c3d' width='800' height='600'/%3E%3Ctext x='50%25' y='50%25' fill='white' font-size='32' text-anchor='middle'%3E${facility.title}%3C/text%3E%3C/svg%3E`;
        };
    }

    // Navigation
    function showNext() {
        currentIndex = (currentIndex + 1) % facilities.length;
        updateLightbox();
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + facilities.length) % facilities.length;
        updateLightbox();
    }

    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', showNext);
    prevBtn.addEventListener('click', showPrev);

    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNext();
        if (e.key === 'ArrowLeft') showPrev();
    });

    // Prevent image drag
    lightboxImg.addEventListener('dragstart', (e) => e.preventDefault());

    console.log('✅ Lightbox Gallery initialized successfully!');
} else {
    console.warn('⚠️ Lightbox elements not found. Make sure HTML structure is correct.');
}