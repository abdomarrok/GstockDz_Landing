// GstockDZ Landing Page - Main JavaScript

// UI Logic
document.getElementById('currentYear').textContent = new Date().getFullYear();
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuButton = document.getElementById('mobile-menu-button');

// Mobile menu toggle with aria-expanded
mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('button, a').forEach(l => l.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
}));

// ==========================================
// BACK TO TOP BUTTON
// ==========================================
const backToTopBtn = document.getElementById('backToTop');

// Show button after scrolling down
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Smooth scroll to top
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==========================================
// TOAST NOTIFICATION UTILITY
// ==========================================
function showToast(message, type = 'info') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    // Set message
    toastMessage.textContent = message;

    // Set icon and type
    toast.className = 'toast show ' + type;
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
    } else {
        toastIcon.className = 'fas fa-info-circle';
    }

    // Auto hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// ==========================================
// SLIDER LOGIC
// ==========================================
const screenshotsContainer = document.getElementById('screenshots-container');
const AUTOPLAY_DELAY = 4000;
let autoplayInterval;
let isAutoplayPaused = false;

function scrollScreenshots(direction) {
    const scrollAmount = 350;
    if (direction === 1) {
        screenshotsContainer.scrollLeft += scrollAmount;
    } else if (direction === -1) {
        screenshotsContainer.scrollLeft -= scrollAmount;
    }
    updateCarouselDots();
}

function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
        if (!isAutoplayPaused) {
            const container = document.getElementById('screenshots-container');
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (container.scrollLeft <= -(maxScroll - 50)) {
                container.scrollLeft = 0;
            } else {
                scrollScreenshots(-1);
            }
        }
    }, AUTOPLAY_DELAY);
}

function pauseAutoplay() {
    isAutoplayPaused = true;
    const btn = document.getElementById('autoplayBtn');
    if (btn) btn.innerHTML = '<i class="fas fa-play"></i>';
}

function resumeAutoplay() {
    isAutoplayPaused = false;
    const btn = document.getElementById('autoplayBtn');
    if (btn) btn.innerHTML = '<i class="fas fa-pause"></i>';
}

function toggleAutoplay() {
    if (isAutoplayPaused) {
        resumeAutoplay();
    } else {
        pauseAutoplay();
    }
}

function updateCarouselDots() {
    const container = document.getElementById('screenshots-container');
    const dots = document.querySelectorAll('.carousel-dot');
    const cardWidth = 340;
    const currentIndex = Math.round(Math.abs(container.scrollLeft) / cardWidth);

    dots.forEach((dot, index) => {
        if (index === currentIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function scrollToCard(index) {
    const container = document.getElementById('screenshots-container');
    const cardWidth = 340;
    container.scrollLeft = -(index * cardWidth);
    updateCarouselDots();
}

function initCarouselDots() {
    const container = document.getElementById('screenshots-container');
    const cards = container.querySelectorAll('.screenshot-card');
    const dotsContainer = document.getElementById('carousel-dots');

    if (!dotsContainer) return;

    dotsContainer.innerHTML = '';
    cards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
        dot.onclick = () => scrollToCard(index);
        dotsContainer.appendChild(dot);
    });

    container.addEventListener('scroll', () => {
        updateCarouselDots();
    });

    startAutoplay();
    initKeyboardNavigation();
}

function initKeyboardNavigation() {
    const container = document.getElementById('screenshots-container');

    document.addEventListener('keydown', (e) => {
        const rect = container.getBoundingClientRect();
        const isInView = (
            rect.top < window.innerHeight &&
            rect.bottom > 0
        );

        if (isInView) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                scrollScreenshots(-1);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                scrollScreenshots(1);
            }
        }
    });
}

// ==========================================
// DOWNLOAD MODAL LOGIC
// ==========================================
const downloadModal = document.getElementById("downloadModal");
const downloadCloseBtn = downloadModal.querySelector(".close-button");

function openDownloadModal() {
    downloadModal.style.display = "flex";
    checkVersion();
}

function closeDownloadModal() {
    downloadModal.style.display = "none";
}

downloadCloseBtn.addEventListener("click", closeDownloadModal);

window.addEventListener("click", function (event) {
    if (event.target == downloadModal) {
        closeDownloadModal();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (downloadModal.style.display === "flex") {
            closeDownloadModal();
        }
        if (imageModal.style.display === "flex") {
            closeImageModal();
        }
    }
});

// ==========================================
// IMAGE MODAL LOGIC
// ==========================================
const imageModal = document.getElementById('imageModal');
const fullImage = document.getElementById('fullImage');

const imageList = [
    'img/orders_list.webp',
    'img/inventory_list.webp',
    'img/barcode_print.webp',
    'img/reports.webp',
    'img/stockEtat.webp',
    'img/login.webp',
    'img/dashboard.webp',
    'img/permission_managemnt.webp',
    'img/chose_mode.webp',
    'img/fiill enterprize info.webp'
];

let currentImageIndex = 0;

function openImageModal(imageSrc) {
    currentImageIndex = imageList.indexOf(imageSrc);
    if (currentImageIndex === -1) currentImageIndex = 0;

    fullImage.src = imageSrc;
    imageModal.style.display = 'flex';
    updateImageCounter();
}

function closeImageModal(event) {
    if (event) event.preventDefault();
    imageModal.style.display = 'none';
}

function navigateImage(direction) {
    currentImageIndex += direction;

    if (currentImageIndex < 0) {
        currentImageIndex = imageList.length - 1;
    } else if (currentImageIndex >= imageList.length) {
        currentImageIndex = 0;
    }

    fullImage.src = imageList[currentImageIndex];
    updateImageCounter();
}

function updateImageCounter() {
    document.getElementById('currentImageIndex').textContent = currentImageIndex + 1;
}

document.getElementById('totalImages').textContent = imageList.length;

// ==========================================
// VERSION CONTROL SYSTEM - Enhanced with Loading State
// ==========================================
async function checkVersion() {
    const featuresList = document.getElementById('displayFeatures');
    const versionsContainer = document.getElementById('versionsContainer');

    // Show loading state
    featuresList.innerHTML = '<li class="flex items-center"><i class="fas fa-spinner fa-spin ml-2 text-blue-500"></i> جاري التحميل...</li>';
    versionsContainer.innerHTML = '<div class="text-center text-gray-500 py-4"><i class="fas fa-spinner fa-spin ml-2"></i> جاري تحميل الإصدارات المتاحة...</div>';

    try {
        const response = await fetch('versions.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const releases = data.releases;

        if (!releases || releases.length === 0) throw new Error("No releases found.");

        const latest = releases[0];
        document.getElementById('displayVersion').textContent = 'v' + latest.version;
        document.getElementById('displayDate').textContent = 'تاريخ النشر: ' + latest.releaseDate;
        document.getElementById('heroVersionBadge').textContent = 'الإصدار الأخير v' + latest.version + ' متاح الآن';

        featuresList.innerHTML = '';
        latest.features.forEach(feature => {
            const li = document.createElement('li');
            li.className = 'flex items-center';
            li.innerHTML = `<i class="fas fa-check-circle text-green-500 ml-3"></i> ${feature}`;
            featuresList.appendChild(li);
        });

        versionsContainer.innerHTML = '';

        releases.forEach(release => {
            const isLatest = (release.version === latest.version);
            const releaseBadge = isLatest ? '<span class="bg-green-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full mr-2">الأحدث</span>' : '';

            const html = `
                <div class="download-option-card flex flex-col space-y-3">
                    <div class="flex justify-between items-center pb-2 border-b border-gray-300">
                        <h5 class="text-xl font-bold text-gray-800">
                            الإصدار ${release.version} ${releaseBadge}
                        </h5>
                        <p class="text-sm text-gray-500">تاريخ: ${release.releaseDate}</p>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-3">
                        <a href="${release.downloadUrlWindows}" target="_blank" class="text-center py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors text-sm">
                            <i class="fab fa-windows ml-2"></i> تحميل لـ Windows
                        </a>
                        <a href="${release.downloadUrlLinux}" target="_blank" class="text-center py-2 rounded-lg bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition-colors text-sm">
                            <i class="fab fa-linux ml-2"></i> تحميل لـ Linux
                        </a>
                        <a href="${release.downloadUrlMac}" target="_blank" class="text-center py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-800 transition-colors text-sm">
                            <i class="fab fa-apple ml-2"></i> تحميل لـ macOS
                        </a>
                    </div>
                </div>
            `;
            versionsContainer.insertAdjacentHTML('beforeend', html);
        });

        // Show success toast
        showToast('تم تحميل الإصدارات بنجاح', 'success');

    } catch (error) {
        console.error("Error loading versions:", error);
        featuresList.innerHTML = '<li class="text-red-500"><i class="fas fa-exclamation-triangle ml-2"></i> لا يوجد اتصال بالخادم حالياً</li>';
        document.getElementById('displayVersion').textContent = 'v1.0.0 (افتراضي)';
        versionsContainer.innerHTML = '<div class="text-center text-red-500 py-4"><i class="fas fa-exclamation-triangle ml-2"></i> فشل تحميل قائمة الإصدارات</div>';

        // Show error toast
        showToast('فشل في تحميل بيانات الإصدارات', 'error');
    }
}

// ==========================================
// SCROLL REVEAL ANIMATIONS
// ==========================================
if ('IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// INITIALIZE ON DOM CONTENT LOADED
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    initCarouselDots();
});
