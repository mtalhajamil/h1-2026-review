/* ==========================================
   Muhammad Talha Jamil - H1 2026 JavaScript
   Handles ScrollSpy, Fade-Ins, and Mobile Nav
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Mobile Navigation Toggle ---
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', (e) => {
            sidebar.classList.toggle('open');
            // Change icon based on state
            const icon = mobileToggle.querySelector('i');
            if (sidebar.classList.contains('open')) {
                icon.className = 'fa-solid fa-xmark';
            } else {
                icon.className = 'fa-solid fa-bars';
            }
            e.stopPropagation();
        });

        // Close sidebar when clicking outside of it on mobile
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') && !sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
            }
        });
    }

    // --- Smooth Anchor Navigation ---
    const navLinks = document.querySelectorAll('.nav-links li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Close mobile menu on link click
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                if (mobileToggle) {
                    mobileToggle.querySelector('i').className = 'fa-solid fa-bars';
                }
            }
        });
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                // Optional: Stop observing once it appears
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // --- ScrollSpy: Highlight current active menu item on scroll ---
    const sections = document.querySelectorAll('section[id]');
    
    const scrollSpyOptions = {
        root: null,
        rootMargin: '-20% 0px -60% 0px', // Trigger when section occupies the middle portion of viewport
        threshold: 0
    };

    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                // Remove active class from all links
                document.querySelectorAll('.nav-links li').forEach(li => {
                    li.classList.remove('active');
                });
                // Add active class to corresponding link
                const activeLink = document.querySelector(`.nav-links li a[href="#${id}"]`);
                if (activeLink) {
                    activeLink.parentElement.classList.add('active');
                }
            }
        });
    }, scrollSpyOptions);

    sections.forEach(section => {
        scrollSpyObserver.observe(section);
    });
});
