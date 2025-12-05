/**
 * Liberation War Archive Website Scripts
 * Handles interactivity for the user interface.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================
  // Mobile Navigation Toggle
  // =========================================
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      // Toggle the 'active' class on the navigation menu to slide it in/out
      mainNav.classList.toggle('active');

      // Optional: Toggle ARIA attribute for accessibility
      const isExpanded =
        mobileToggle.getAttribute('aria-expanded') === 'true' || false;
      mobileToggle.setAttribute('aria-expanded', !isExpanded);

      // Optional: Animate hamburger bars (simple version)
      mobileToggle.classList.toggle('open');
    });
  }

  // Close mobile menu when clicking outside of it (UX improvement)
  document.addEventListener('click', event => {
    const isClickInsideNav = mainNav.contains(event.target);
    const isClickOnToggle = mobileToggle.contains(event.target);

    if (
      mainNav.classList.contains('active') &&
      !isClickInsideNav &&
      !isClickOnToggle
    ) {
      mainNav.classList.remove('active');
      mobileToggle.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  });

  // =========================================
  // Future Interactivity Placeholders
  // =========================================

  // Code for Gallery Zoom/Modal functionality would go here [cite: 26]
  // Code for Media Player controls for interviews would go here [cite: 45]
  // Form validation for the Contact page would go here before sending to backend
});
// =========================================
    // Gallery Section Functionality
    // =========================================

    // --- 1. Category Filtering Logic  ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');

                    if (filterValue === 'all' || filterValue === itemCategory) {
                        item.classList.remove('hide');
                        // Optional: Add fade-in animation class here
                    } else {
                        item.classList.add('hide');
                    }
                });
            });
        });
    }

    // --- 2. Lightbox Modal (Zoom & Download) Logic  ---
    const lightboxModal = document.getElementById('lightbox-modal');
    if (lightboxModal && galleryItems.length > 0) {
        const modalImage = lightboxModal.querySelector('.modal-image');
        const modalCaption = lightboxModal.querySelector('.modal-caption-text');
        const downloadBtn = lightboxModal.querySelector('.download-btn');
        const closeModalBtn = lightboxModal.querySelector('.close-modal');

        // Function to open modal
        const openModal = (highResSrc, caption) => {
            modalImage.src = highResSrc;
            modalCaption.textContent = caption;
            // Set download link href to the high-res image source 
            downloadBtn.href = highResSrc; 
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        // Function to close modal
        const closeModal = () => {
            lightboxModal.classList.remove('active');
            modalImage.src = ''; // Clear src to stop loading if video etc.
            document.body.style.overflow = ''; // Restore scrolling
        };

        // Add click event to all gallery items to open modal
        galleryItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const highResSrc = item.getAttribute('data-src');
                const caption = item.getAttribute('data-caption');
                openModal(highResSrc, caption);
            });
        });

        // Close modal events
        closeModalBtn.addEventListener('click', closeModal);

        // Close if clicking outside the image content area (on the dark background)
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeModal();
            }
        });
        
        // Close on Escape key press for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeModal();
            }
        });
    }