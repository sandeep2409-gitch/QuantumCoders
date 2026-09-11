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
      hamburger.classList.toggle('active');
      mainNav.classList.toggle('active');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
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

  const btnViewEventDetailsS1 = document.getElementById('btn-view-event-details-s1');

  if (btnViewEventDetails) {
    btnViewEventDetails.addEventListener('click', () => {
      openModal('modal-event');
    });
  }

  if (btnViewEventDetailsS1) {
    btnViewEventDetailsS1.addEventListener('click', () => {
      openModal('modal-event');
    });
  }

  if (btnViewAllEvents) {
    btnViewAllEvents.addEventListener('click', () => {
      showToast('Loading full 2026 event archive...');
      openModal('modal-event');
    });
  }

  // Interactive CLI Filter Flags in Events Section
  const cliFlags = document.querySelectorAll('.cli-flag');
  cliFlags.forEach(flag => {
    flag.addEventListener('click', () => {
      cliFlags.forEach(f => f.classList.remove('active'));
      flag.classList.add('active');
      showToast(`Filter applied: ${flag.textContent.trim()}`);
    });
  });

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
  // 5. Team Section - Pokémon Cards 3D Tilt & Upload System
  // ------------------------------------------------------------------------
  const pokemonCards = document.querySelectorAll('.pokemon-card');
  const btnExploreAchievements = document.getElementById('btn-explore-achievements');

  // Interactive 3D Card Tilt & Hologram Flare
  pokemonCards.forEach(card => {
    const holo = card.querySelector('.pokemon-holo-layer');
    const glare = card.querySelector('.pokemon-glare-layer');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle dynamic 3D tilt
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      card.style.transform = `perspective(1000px) translateY(-68px) scale(1.15) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

      // Dynamic Holographic light tracking
      if (holo) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        holo.style.backgroundPosition = `${percentX}% ${percentY}%`;
      }
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.45) 0%, transparent 65%)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      if (holo) holo.style.backgroundPosition = '';
      if (glare) glare.style.background = '';
    });

    // Optional Quick Photo Upload for User Convenience
    const placeholder = card.querySelector('.pokemon-placeholder-visual');
    const cardImg = card.querySelector('.pokemon-card-img');
    if (placeholder && cardImg) {
      placeholder.style.cursor = 'pointer';
      placeholder.addEventListener('click', (e) => {
        e.stopPropagation();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (uploadEvent) => {
          const file = uploadEvent.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (loadEvent) => {
              cardImg.src = loadEvent.target.result;
              showToast(`Uploaded photo for ${card.querySelector('.pokemon-member-name')?.textContent || 'team member'}!`);
            };
            reader.readAsDataURL(file);
          }
        };
        fileInput.click();
      });
    }
  });

  if (btnExploreAchievements) {
    btnExploreAchievements.addEventListener('click', () => {
      showToast('🏆 Quantum Coders: Winner of Best Campus Innovation Hub 2026!');
    });
  }

  // ------------------------------------------------------------------------
  // React Bits - CircularText Component Integration
  // ------------------------------------------------------------------------
  const circularTextElements = document.querySelectorAll('.circular-text');

  circularTextElements.forEach(el => {
    const text = el.getAttribute('data-text') || 'TEAM QC • ';
    const spinDuration = parseFloat(el.getAttribute('data-speed')) || 20;
    const onHover = el.getAttribute('data-hover') || 'speedUp';
    const letters = Array.from(text);

    el.innerHTML = '';
    letters.forEach((letter, i) => {
      const span = document.createElement('span');
      const rotationDeg = (360 / letters.length) * i;
      const factor = Math.PI / letters.length;
      const x = factor * i;
      const y = factor * i;
      const transform = `rotateZ(${rotationDeg}deg) translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;

      span.textContent = letter;
      span.style.transform = transform;
      span.style.webkitTransform = transform;
      el.appendChild(span);
    });

    let currentRotation = 0;
    let baseSpeed = 360 / spinDuration; // deg/sec
    let currentSpeed = baseSpeed;
    let targetSpeed = baseSpeed;
    let currentScale = 1;
    let targetScale = 1;
    let lastTime = performance.now();

    function animate(now) {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      // Smooth interpolation matching React Bits spring/tween transitions
      currentSpeed += (targetSpeed - currentSpeed) * 0.12;
      currentScale += (targetScale - currentScale) * 0.12;
      currentRotation = (currentRotation + currentSpeed * delta) % 360;

      el.style.transform = `rotate(${currentRotation.toFixed(2)}deg) scale(${currentScale.toFixed(3)})`;
      requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

    el.addEventListener('mouseenter', () => {
      if (onHover === 'speedUp') {
        targetSpeed = 360 / (spinDuration / 4);
      } else if (onHover === 'slowDown') {
        targetSpeed = 360 / (spinDuration * 2);
      } else if (onHover === 'pause') {
        targetSpeed = 0;
      } else if (onHover === 'goBonkers') {
        targetSpeed = 360 / (spinDuration / 20);
        targetScale = 0.8;
      }
    });

    el.addEventListener('mouseleave', () => {
      targetSpeed = baseSpeed;
      targetScale = 1;
    });
  });

  // ------------------------------------------------------------------------
  // Coding Theme - Circuit Particle Matrix Canvas
  // ------------------------------------------------------------------------
  const codingCanvas = document.getElementById('team-coding-canvas');
  if (codingCanvas) {
    const ctx = codingCanvas.getContext('2d');
    let width = codingCanvas.width = codingCanvas.offsetWidth;
    let height = codingCanvas.height = codingCanvas.offsetHeight;

    window.addEventListener('resize', () => {
      if (codingCanvas) {
        width = codingCanvas.width = codingCanvas.offsetWidth;
        height = codingCanvas.height = codingCanvas.offsetHeight;
      }
    });

    const particles = [];
    const count = Math.min(Math.floor((width * height) / 25000), 45);

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1,
        color: Math.random() > 0.4 ? 'rgba(56, 189, 248, ' : 'rgba(139, 92, 246, '
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;
    const teamSection = document.getElementById('team');
    if (teamSection) {
      teamSection.addEventListener('mousemove', (e) => {
        const rect = codingCanvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      });
      teamSection.addEventListener('mouseleave', () => {
        mouseX = -1000;
        mouseY = -1000;
      });
    }

    function renderCircuit() {
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Subtle mouse interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          p.x -= (dx / dist) * 0.8;
          p.y -= (dy / dist) * 0.8;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + '0.75)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby nodes with circuit lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const distNodes = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (distNodes < 110) {
            const alpha = (1 - distNodes / 110) * 0.25;
            ctx.strokeStyle = p.color + alpha + ')';
            ctx.lineWidth = 0.85;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(renderCircuit);
    }
    requestAnimationFrame(renderCircuit);
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

  // ------------------------------------------------------------------------
  // 9. Hero Section Typewriter Animation
  // ------------------------------------------------------------------------
  const line1El = document.getElementById('type-line-1');
  const line2El = document.getElementById('type-line-2');
  const line3El = document.getElementById('type-line-3');
  const cursorEl = document.getElementById('typewriter-cursor');

  if (line1El && line2El && line3El && cursorEl) {
    const lines = [
      { el: line1El, text: 'Welcome to ,' },
      { el: line2El, text: 'The' },
      { el: line3El, text: '<Quantum Coders />' }
    ];

    let currentLine = 0;
    let currentChar = 0;
    const typeSpeed = 55; // ms per character
    const linePause = 240; // ms pause between lines

    function typeWriterStep() {
      if (currentLine < lines.length) {
        const line = lines[currentLine];
        if (currentChar < line.text.length) {
          line.el.textContent += line.text.charAt(currentChar);
          currentChar++;
          line.el.after(cursorEl);
          setTimeout(typeWriterStep, typeSpeed + Math.random() * 20);
        } else {
          currentLine++;
          currentChar = 0;
          setTimeout(typeWriterStep, linePause);
        }
      } else {
        // Finished typing all lines: cursor stays at the end of line 3
        line3El.after(cursorEl);
      }
    }

    // Clear initial content and start typing after slight initial delay
    line1El.textContent = '';
    line2El.textContent = '';
    line3El.textContent = '';
    line1El.after(cursorEl);
    setTimeout(typeWriterStep, 300);
  }

});
