document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      // Only handle internal anchors (ignore "#" or empty)
      if (!href || href === '#') return;
      const targetElement = document.querySelector(href);
      if (!targetElement) return; // guard

      e.preventDefault();
      // scroll accounting for fixed nav height
      const navOffset = 80;
      const top = targetElement.getBoundingClientRect().top + window.pageYOffset - navOffset;
      window.scrollTo({ top, behavior: 'smooth' });

      if (mobileMenu) mobileMenu.classList.add('hidden');
    });
  });

  // Back to top button logic
  const backToTopButton = document.getElementById('back-to-top');
  if (backToTopButton) {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        backToTopButton.classList.remove('opacity-0', 'invisible');
        backToTopButton.classList.add('opacity-100', 'visible');
      } else {
        backToTopButton.classList.remove('opacity-100', 'visible');
        backToTopButton.classList.add('opacity-0', 'invisible');
      }
    });

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Fade-in animation observer for sections
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // Animate skill bars when they come into view (guarded)
  const skillObserver = new IntersectionObserver((entries, sObs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skillBars = entry.target.querySelectorAll('.skill-bar');
        skillBars.forEach(bar => {
          const width = bar.getAttribute('data-width') || bar.style.width || '0';
          bar.style.width = '0';
          setTimeout(() => bar.style.width = width, 100);
        });
        sObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('#skills .bg-gray-800').forEach(skillSection => {
    skillObserver.observe(skillSection);
  });

  // -------- Show More Certificates (robust) --------
  const showMoreBtn = document.getElementById('show-more-btn');
  const extraCertificates = document.getElementById('extra-certificates');

  if (showMoreBtn && extraCertificates) {
    showMoreBtn.addEventListener('click', () => {
      const hidden = extraCertificates.classList.contains('hidden');

      if (hidden) {
        // reveal with small staggered fade-in
        extraCertificates.classList.remove('hidden');
        // add fade-in class to each child for a nicer appearance
        const children = Array.from(extraCertificates.children);
        children.forEach((child, i) => {
          child.classList.add('opacity-0', 'translate-y-4');
          setTimeout(() => {
            child.classList.remove('opacity-0', 'translate-y-4');
            child.classList.add('fade-in');
          }, 80 * i);
        });
        showMoreBtn.textContent = 'Show Less';
      } else {
        // hide
        extraCertificates.classList.add('hidden');
        // optionally remove fade-in classes so it re-animates next time
        Array.from(extraCertificates.children).forEach(child => {
          child.classList.remove('fade-in', 'opacity-0', 'translate-y-4');
        });
        showMoreBtn.textContent = 'Show More';
      }
    });
  }

  // If any other functionality relies on elements that might not exist, guard them similarly above.
});





  
