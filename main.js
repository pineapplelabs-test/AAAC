// McCann-Style Interactive Engine for AA Advertising & Communications

document.addEventListener('DOMContentLoaded', () => {
  // 1. Hero Campaign Visual Slider (McCann Style Auto-Rotation & Tab Controls)
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroTabs = document.querySelectorAll('.hero-tab-btn');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(index) {
    heroSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    heroTabs.forEach((tab, i) => {
      if (i === index) {
        tab.classList.add('active', 'text-white');
        tab.classList.remove('text-slate-400');
      } else {
        tab.classList.remove('active', 'text-white');
        tab.classList.add('text-slate-400');
      }
    });

    currentSlide = index;
  }

  function nextSlide() {
    const next = (currentSlide + 1) % heroSlides.length;
    goToSlide(next);
  }

  function startSlideTimer() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  heroTabs.forEach((tab, i) => {
    tab.addEventListener('click', () => {
      goToSlide(i);
      startSlideTimer(); // reset timer on manual click
    });
  });

  if (heroSlides.length > 0) {
    startSlideTimer();
  }

  // 2. Fullscreen Slide-Over Drawer Navigation
  const openDrawerBtn = document.getElementById('open-drawer-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');
  const drawer = document.getElementById('mccann-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (openDrawerBtn && closeDrawerBtn && drawer) {
    openDrawerBtn.addEventListener('click', () => {
      drawer.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    closeDrawerBtn.addEventListener('click', () => {
      drawer.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
  }

  // 3. Campaign Brief Form Submission
  const contactForm = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');
  const formSuccess = document.getElementById('form-success');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'TRANSMITTING BRIEF...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        contactForm.reset();
        if (formSuccess) {
          formSuccess.classList.remove('hidden');
          setTimeout(() => {
            formSuccess.classList.add('hidden');
          }, 7000);
        }
      }, 700);
    });
  }
});
