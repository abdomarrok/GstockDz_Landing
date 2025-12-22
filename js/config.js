// GstockDZ Landing Page - Configuration Constants

// Carousel Configuration
export const CAROUSEL_CONFIG = {
    SCROLL_AMOUNT: 350,
    AUTOPLAY_DELAY: 4000,
    CARD_WIDTH: 340
};

// Animation Configuration
export const ANIMATION_CONFIG = {
    SCROLL_REVEAL_THRESHOLD: 0.1,
    SCROLL_REVEAL_ROOT_MARGIN: '0px 0px -50px 0px',
    TOAST_DURATION: 3000,
    BACK_TO_TOP_THRESHOLD: 300
};

// Image List for Modal
export const IMAGE_LIST = [
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

// API Endpoints
export const API_CONFIG = {
    VERSIONS_URL: 'versions.json'
};

// CSS Classes
export const CSS_CLASSES = {
    ACTIVE: 'active',
    SHOW: 'show',
    HIDDEN: 'hidden',
    REVEALED: 'revealed',
    CAROUSEL_DOT: 'carousel-dot',
    SCREENSHOT_CARD: 'screenshot-card'
};

// Toast Types
export const TOAST_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    INFO: 'info'
};

// Toast Icons
export const TOAST_ICONS = {
    [TOAST_TYPES.SUCCESS]: 'fas fa-check-circle',
    [TOAST_TYPES.ERROR]: 'fas fa-exclamation-circle',
    [TOAST_TYPES.INFO]: 'fas fa-info-circle'
};
