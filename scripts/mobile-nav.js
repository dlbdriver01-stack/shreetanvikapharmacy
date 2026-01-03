document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-mobile-menu');

    // Create overlay if it doesn't exist
    let overlay = document.getElementById('mobile-menu-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'mobile-menu-overlay';
        overlay.className = 'fixed inset-0 bg-black/50 z-40 hidden transition-opacity duration-300 opacity-0';
        document.body.appendChild(overlay);
    }

    function toggleMenu() {
        const isHidden = mobileMenu.classList.contains('hidden');
        if (isHidden) {
            // Open menu
            mobileMenu.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                mobileMenu.classList.remove('translate-x-full');
                overlay.classList.remove('hidden');
                setTimeout(() => overlay.classList.remove('opacity-0'), 10);
            }, 10);
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        } else {
            // Close menu
            mobileMenu.classList.add('translate-x-full');
            overlay.classList.add('opacity-0');

            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                overlay.classList.add('hidden');
                document.body.style.overflow = ''; // Restore scrolling
            }, 300); // Wait for transition
        }
    }

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', () => {
            toggleMenu();
        });
    }

    // Close on link click
    const mobileLinks = mobileMenu?.querySelectorAll('a');
    mobileLinks?.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
});
