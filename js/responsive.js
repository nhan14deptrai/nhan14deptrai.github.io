// ================= RESPONSIVE INTERACTIONS ================= 

document.addEventListener('DOMContentLoaded', function() {
    // Lắng nghe sự kiện resize
    window.addEventListener('resize', debounce(() => {
        // Điều chỉnh layout khi resize
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            // Sidebar luôn visible, không cần ẩn/hiện
        }
    }, 250));

    // Debounce function để tránh gọi hàm quá nhiều lần
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

    // Handle orientation change
    window.addEventListener('orientationchange', debounce(() => {
        // Refresh layout khi thay đổi hướng thiết bị
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.height = 'auto';
        }
    }, 300));

    // Track scroll position
    let isScrolling = false;
    window.addEventListener('scroll', debounce(() => {
        if (!isScrolling) {
            isScrolling = true;
            // Có thể thêm logic load thêm content ở đây
            isScrolling = false;
        }
    }, 250));

    // Optimize images cho mobile
    const optimizeImages = () => {
        if (window.innerWidth <= 768) {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                // Lazy loading
                if (!img.hasAttribute('loading')) {
                    img.setAttribute('loading', 'lazy');
                }
            });
        }
    };
    
    optimizeImages();

    // Fix viewport pada iOS
    const setViewport = () => {
        let viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
            viewport = document.createElement('meta');
            viewport.name = 'viewport';
            viewport.content = 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes';
            document.head.appendChild(viewport);
        }
    };
    
    setViewport();

    // Detect touch device
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
                (navigator.maxTouchPoints > 0) ||
                (navigator.msMaxTouchPoints > 0));
    };

    if (isTouchDevice()) {
        document.body.classList.add('is-touch-device');
    }

    // Enhance clickable areas on touch devices
    if (isTouchDevice()) {
        const enhanceTouchTargets = () => {
            const buttons = document.querySelectorAll('button, a, .clickable');
            buttons.forEach(btn => {
                const padding = window.getComputedStyle(btn).padding;
                if (padding === '0px') {
                    btn.style.padding = '10px';
                }
            });
        };
        
        enhanceTouchTargets();
    }

    // Auto-adjust font sizes based on viewport
    const adjustFontSizes = () => {
        const width = window.innerWidth;
        const root = document.documentElement;
        
        if (width <= 480) {
            root.style.fontSize = '13px';
        } else if (width <= 768) {
            root.style.fontSize = '14px';
        } else if (width <= 1024) {
            root.style.fontSize = '15px';
        } else {
            root.style.fontSize = '16px';
        }
    };
    
    adjustFontSizes();
    window.addEventListener('resize', debounce(adjustFontSizes, 250));

    // Prevent double-tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Add scroll padding to account for fixed header
    const adjustScrollPadding = () => {
        const headerHeight = document.querySelector('.top-header')?.offsetHeight || 0;
        document.documentElement.style.scrollPaddingTop = (headerHeight + 20) + 'px';
    };
    
    adjustScrollPadding();
    window.addEventListener('resize', debounce(adjustScrollPadding, 250));
});

// Hỗ trợ service worker cho offline access (optional)
if ('serviceWorker' in navigator && window.innerWidth <= 768) {
    // navigator.serviceWorker.register('/sw.js').catch(() => {});
}

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Lazy load non-critical resources
        const lazyElements = document.querySelectorAll('[data-lazy]');
        lazyElements.forEach(el => {
            // Load resource
        });
    });
}
