/* ==========================================================================
   IEDC MASC - Interactive Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------------------------------------
  // 1. Live Timestamp in Top Notice Bar
  // ------------------------------------------------------------------------
  const liveTimestamp = document.getElementById('live-timestamp');
  function updateTimestamp() {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    }) + ', ' + now.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    if (liveTimestamp) {
      liveTimestamp.textContent = formatted;
    }
  }
  updateTimestamp();
  setInterval(updateTimestamp, 60000);

  // ------------------------------------------------------------------------
  // 2. Mobile Menu Navigation Toggle
  // ------------------------------------------------------------------------
  const hamburger = document.getElementById('hamburger-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', () => {
      mainNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('active');
      });
    });
  }

  // Active Nav Link Scroll Spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Nav actions for Create ID and Downloads
  const navCreateId = document.getElementById('nav-create-id');
  const navDownloads = document.getElementById('nav-downloads');

  if (navCreateId) {
    navCreateId.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Redirecting to  Student Registration Portal...');
      openModal('modal-contact');
    });
  }

  if (navDownloads) {
    navDownloads.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Downloading Quantum Coders Club poster...');
    });
  }

  // ------------------------------------------------------------------------
  // 3. Event Section Actions
  // ------------------------------------------------------------------------
  const btnCopyEventLink = document.getElementById('btn-copy-event-link');
  const btnViewEventDetails = document.getElementById('btn-view-event-details');
  const btnViewAllEvents = document.getElementById('btn-view-all-events');

  if (btnCopyEventLink) {
    btnCopyEventLink.addEventListener('click', () => {
      const eventUrl = 'https://iedc.masc.edu.in/events/execom-selection-2026';
      navigator.clipboard.writeText(eventUrl).then(() => {
        showToast('Link copied to clipboard!');
      }).catch(() => {
        showToast('Link copied: ' + eventUrl);
      });
    });
  }

  if (btnViewEventDetails) {
    btnViewEventDetails.addEventListener('click', () => {
      openModal('modal-event');
    });
  }

  if (btnViewAllEvents) {
    btnViewAllEvents.addEventListener('click', () => {
      showToast('Loading full 2026 event archive...');
      openModal('modal-event');
    });
  }

  // ------------------------------------------------------------------------
  // 4. Gallery Lightbox Handler
  // ------------------------------------------------------------------------
  const galleryCards = document.querySelectorAll('.gallery-card');
  const btnViewAllGallery = document.getElementById('btn-view-all-gallery');
  const galleryModalTitle = document.getElementById('gallery-modal-title');
  const lightboxGrid = document.getElementById('lightbox-grid');

  const galleryData = {
    budding: {
      title: 'BUDDING ENTREPRENEURS - MTM Collection',
      images: ['assets/startup.jpg', 'assets/college.jpg', 'assets/startup.jpg']
    },
    building: {
      title: 'BUILDING BEYOND Collection',
      images: ['assets/college.jpg', 'assets/startup.jpg']
    },
    empowering: {
      title: 'EMPOWERING STARTUP Collection',
      images: ['assets/startup.jpg', 'assets/college.jpg', 'assets/startup.jpg']
    }
  };

  function openGalleryCollection(collectionKey) {
    const data = galleryData[collectionKey] || galleryData['empowering'];
    if (galleryModalTitle) galleryModalTitle.textContent = data.title;
    if (lightboxGrid) {
      lightboxGrid.innerHTML = data.images.map(img => `
        <div style="border-radius:12px; overflow:hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <img src="${img}" alt="Gallery photo" style="width:100%; height:200px; object-fit:cover;">
        </div>
      `).join('');
    }
    openModal('modal-gallery');
  }

  galleryCards.forEach(card => {
    card.addEventListener('click', () => {
      const collectionKey = card.getAttribute('data-collection');
      openGalleryCollection(collectionKey);
    });
  });

  if (btnViewAllGallery) {
    btnViewAllGallery.addEventListener('click', () => {
      openGalleryCollection('empowering');
    });
  }

  // ------------------------------------------------------------------------
  // 5. Team Section - Explore Achievements Button
  // ------------------------------------------------------------------------
  const btnExploreAchievements = document.getElementById('btn-explore-achievements');
  if (btnExploreAchievements) {
    btnExploreAchievements.addEventListener('click', () => {
      showToast('🏆 IEDC MASC bagged Best Campus Innovation Hub 2026!');
    });
  }

  // ------------------------------------------------------------------------
  // 6. Contact Form & GET IN TOUCH Modal
  // ------------------------------------------------------------------------
  const btnGetInTouch = document.getElementById('btn-get-in-touch');
  const contactForm = document.getElementById('contact-form-element');

  if (btnGetInTouch) {
    btnGetInTouch.addEventListener('click', () => {
      openModal('modal-contact');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal('modal-contact');
      showToast('Thank you! Your inquiry has been sent to IEDC MASC.');
      contactForm.reset();
    });
  }

  // ------------------------------------------------------------------------
  // 7. Floating Chat Assistant Widget
  // ------------------------------------------------------------------------
  const chatToggle = document.getElementById('chat-toggle');
  const chatPopover = document.getElementById('chat-popover');
  const chatClose = document.getElementById('chat-close');
  const chatForm = document.getElementById('chat-form');
  const chatInput = document.getElementById('chat-input');
  const chatMessages = document.getElementById('chat-messages');

  if (chatToggle && chatPopover) {
    chatToggle.addEventListener('click', () => {
      chatPopover.classList.toggle('active');
    });
  }

  if (chatClose && chatPopover) {
    chatClose.addEventListener('click', () => {
      chatPopover.classList.remove('active');
    });
  }

  if (chatForm && chatInput && chatMessages) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      // Add user message
      const userMsg = document.createElement('div');
      userMsg.className = 'message user';
      userMsg.textContent = text;
      chatMessages.appendChild(userMsg);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      // Simulate Assistant Response
      setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'message assistant';
        botMsg.textContent = getBotResponse(text);
        chatMessages.appendChild(botMsg);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 800);
    });
  }

  function getBotResponse(query) {
    const q = query.toLowerCase();
    if (q.includes('event') || q.includes('execom') || q.includes('selection')) {
      return 'The IEDC Selection 2026 Phase II drive is on 8th September at AV Hall!';
    } else if (q.includes('team') || q.includes('nodal') || q.includes('lead')) {
      return 'Our Nodal Officers are Mohamed Jabir & Shahna MB, supported by 12 student lead units!';
    } else if (q.includes('contact') || q.includes('join') || q.includes('id')) {
      return 'You can click "GET IN TOUCH" or "Create ID" in the top bar to register with us!';
    } else {
      return 'Thanks for reaching out! Leave your email via GET IN TOUCH and our team will get back to you shortly.';
    }
  }

  // ------------------------------------------------------------------------
  // 8. General Modal & Toast Utility Functions
  // ------------------------------------------------------------------------
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // Close modals on close button or backdrop click
  document.querySelectorAll('[data-close-modal], .modal-backdrop').forEach(el => {
    el.addEventListener('click', (e) => {
      const modal = e.target.closest('.modal');
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  });

  // ESC key closes modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal.active').forEach(m => {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
      });
    }
  });

  function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

});
