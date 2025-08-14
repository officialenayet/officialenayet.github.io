// Global variables
let isMobile = false;
let heroSection = null;
let leftEye = null;
let rightEye = null;

// Check if device is mobile
function checkMobile() {
    isMobile = window.innerWidth <= 768;
}

// Initialize eye tracking
function initEyeTracking() {
    if (isMobile) return;
    
    document.addEventListener('mousemove', handleMouseMove);
}

// Handle mouse movement for eye tracking
function handleMouseMove(e) {
    if (isMobile || !leftEye || !rightEye) return;
    
    const { clientX, clientY } = e;
    const moveX = (clientX - window.innerWidth / 2) / 18;
    const moveY = (clientY - window.innerHeight / 2) / 18;
    
    // Apply transform to both eyes
    const transform = `translate(${moveX}px, ${moveY}px)`;
    leftEye.style.transform = transform;
    rightEye.style.transform = transform;
}

// Initialize modal functionality
function initModal() {
    const helpButton = document.getElementById('helpButton');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeButton = document.getElementById('closeButton');
    
    if (helpButton && modalOverlay && closeButton) {
        helpButton.addEventListener('click', () => {
            modalOverlay.classList.add('active');
        });
        
        closeButton.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });
        
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }
}

// Handle window resize
function handleResize() {
    checkMobile();
    
    // Reinitialize eye tracking if needed
    if (isMobile) {
        document.removeEventListener('mousemove', handleMouseMove);
        if (leftEye && rightEye) {
            leftEye.style.transform = '';
            rightEye.style.transform = '';
        }
    } else {
        initEyeTracking();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    heroSection = document.getElementById('hero');
    leftEye = document.getElementById('leftEye');
    rightEye = document.getElementById('rightEye');
    
    // Check if mobile
    checkMobile();
    
    // Initialize functionality
    initEyeTracking();
    initModal();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    
    // Add keyboard accessibility for modal
    document.addEventListener('keydown', function(e) {
        const modalOverlay = document.getElementById('modalOverlay');
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            modalOverlay.classList.remove('active');
        }
    });
});

// Performance optimization: debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to resize handler
window.addEventListener('resize', debounce(handleResize, 250));