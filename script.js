// ========================================
// AMINAH BOARDING SCHOOL - COMPLETE JS
// ========================================

// 1. Navbar Effect
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

// 2. Mobile Menu Toggle
const mobileBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if(mobileBtn) {
    mobileBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
}

// 3. UNIVERSAL 3D TILT EFFECT (IMPROVED)
// Perbaikan: Efek hover sekarang diterapkan ke KARTU (Parent), bukan konten.
const tiltCards = document.querySelectorAll('.tilt-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const cardRect = card.getBoundingClientRect();
        // Hitung posisi kursor relatif terhadap tengah kartu
        const x = e.clientX - cardRect.left - cardRect.width / 2;
        const y = e.clientY - cardRect.top - cardRect.height / 2;

        // Rotasi (dividing by 15 makes it snappy)
        const rotateY = x / 15; 
        const rotateX = y / -15; // Invert X axis for natural feel

        // Terapkan transformasi ke KARTU (Parent), bukan hanya konten
        // Scale 1.02 agar saat miring tidak terlihat pinggirannya putus (aliasing)
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    // Reset saat mouse keluar
    card.addEventListener('mouseleave', () => {
        // Kembalikan transformasi kartu ke posisi semula
        card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
        
        // Transisi halus saat reset
        card.style.transition = 'transform 0.5s ease';
    });
    
    // Hapus transition saat mouse masuk agar tidak delay (laggy)
    card.addEventListener('mouseenter', () => {
        card.style.transition = 'none';
    });
});

// 4. Tab Switcher Logic (Untuk Halaman Pendaftaran)
function openTab(evt, tabName) {
    // Sembunyikan semua tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = "none";
        tabContents[i].classList.remove("active");
    }

    // Hapus class active dari semua tombol tab
    const tabBtns = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabBtns.length; i++) {
        tabBtns[i].className = tabBtns[i].className.replace(" active", "");
    }

    // Tampilkan tab yang dipilih
    const selectedTab = document.getElementById(tabName);
    if(selectedTab) {
        selectedTab.style.display = "block";
        selectedTab.classList.add("active");
    }
    
    // Tambah class active ke tombol yang diklik
    if(evt && evt.currentTarget) {
        evt.currentTarget.className += " active";
    }
}

// 5. Lightbox Logic (Untuk Galeri)
const lightbox = document.getElementById('lightbox');
if (lightbox) {
    const facilities = [
        { img: 'assets/images/gedung-asrama.png', title: 'Asrama', desc: 'Asrama Putra Nyaman.' },
        { img: 'assets/images/mesjid.jpg', title: 'Masjid Jami', desc: 'Pusat Ibadah.' },
        { img: 'assets/images/islamic-center.png', title: 'Gedung Olahraga', desc: 'Area Aktivitas Santri.' }
    ];

    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    const lbCount = document.getElementById('counter');
    let curIndex = 0;

    document.querySelectorAll('.facility-card').forEach((card, idx) => {
        card.addEventListener('click', () => {
            curIndex = idx;
            lightbox.classList.add('active');
            updateLb();
        });
    });

    const closeBtn = document.getElementById('closeBtn');
    if(closeBtn) closeBtn.addEventListener('click', () => lightbox.classList.remove('active'));
    
    function updateLb() {
        if(curIndex < 0 || curIndex >= facilities.length) return;
        const item = facilities[curIndex];
        lbImg.src = item.img;
        lbCap.innerHTML = `<strong>${item.title}</strong><br>${item.desc}`;
        lbCount.innerText = `${curIndex + 1} / ${facilities.length}`;
    }

    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');

    if(nextBtn) {
        nextBtn.addEventListener('click', () => {
            curIndex = (curIndex + 1) % facilities.length;
            updateLb();
        });
    }

    if(prevBtn) {
        prevBtn.addEventListener('click', () => {
            curIndex = (curIndex - 1 + facilities.length) % facilities.length;
            updateLb();
        });
    }
    
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) lightbox.classList.remove('active');
    });
}