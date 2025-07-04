document.addEventListener('DOMContentLoaded', () => {
    // === Script untuk Toggle Menu Navigasi ===
    const toggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) { // Pastikan elemen ditemukan sebelum menambahkan event listener
        toggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    } else {
        console.warn("Elemen menu-toggle atau nav-links tidak ditemukan.");
    }


    // === Script untuk Carousel Promosi ===
    const carouselTrack = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    const promoCards = document.querySelectorAll('.promo-card');

    // Pastikan semua elemen carousel ada sebelum melanjutkan
    if (!carouselTrack || !prevButton || !nextButton || promoCards.length === 0) {
        console.warn("Elemen carousel tidak lengkap. Pastikan '.carousel-track', '.prev-button', '.next-button', dan setidaknya satu '.promo-card' ada di DOM.");
        return; // Hentikan eksekusi script carousel jika elemen tidak ditemukan
    }

    let cardsPerView = 3;
    const cardMargin = 20; // total margin horizontal per kartu (10px kiri + 10px kanan)

    let currentIndex = 0; // Indeks kartu pertama yang terlihat

    // --- DEFINISI FUNGSI updateCarousel (DIPINDAH KE ATAS) ---
    function updateCarousel() {
        // Hitung lebar total satu kartu termasuk margin
        // Hanya hitung jika ada kartu
        const cardWidth = promoCards[0] ? promoCards[0].offsetWidth + cardMargin : 0;

        // Hitung seberapa jauh track harus digeser
        const offset = -currentIndex * cardWidth;
        carouselTrack.style.transform = `translateX(${offset}px)`;
    }
    // -----------------------------------------------------

    // Fungsi untuk mengupdate cardsPerView berdasarkan lebar layar
    const updateCardsPerView = () => {
        if (window.innerWidth <= 768) {
            cardsPerView = 1;
        } else if (window.innerWidth <= 1024) {
            cardsPerView = 2;
        } else {
            cardsPerView = 3;
        }
        // Setelah cardsPerView berubah, sesuaikan posisi carousel
        updateCarousel();
    };

    // Tambahkan event listener untuk resize window
    window.addEventListener('resize', updateCardsPerView);

    // Event listener untuk tombol navigasi
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    nextButton.addEventListener('click', () => {
        // Hitung jumlah maksimal geseran yang mungkin
        // promoCards.length adalah total kartu
        // cardsPerView adalah kartu yang terlihat
        // maxIndex adalah indeks terakhir yang dapat digeser agar tidak ada ruang kosong di akhir
        const maxIndex = promoCards.length - cardsPerView;

        // Pastikan maxIndex tidak negatif (jika jumlah kartu kurang dari cardsPerView)
        // Dan pastikan currentIndex tidak melebihi maxIndex yang valid
        if (currentIndex < maxIndex && maxIndex >= 0) {
            currentIndex++;
            updateCarousel();
        }
    });

    // Panggil updateCardsPerView saat DOMContentLoaded untuk inisialisasi awal
    // Ini juga akan memanggil updateCarousel
    updateCardsPerView();
});