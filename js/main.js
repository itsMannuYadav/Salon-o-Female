// Fade-in animation for sections
document.addEventListener('DOMContentLoaded', function() {
  // Fade-in elements that will be animated
  const fadeElements = document.querySelectorAll('.fade-in');
  
  // Function to check if element is in viewport
  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
      rect.bottom >= 0
    );
  };

  // Function to handle the scroll animation
  const handleScroll = () => {
    fadeElements.forEach(element => {
      if (isInViewport(element) && !element.classList.contains('appear')) {
        element.classList.add('appear');
      }
    });
  };

  // Initial check for elements in viewport
  handleScroll();

  // Listen for scroll events
  window.addEventListener('scroll', handleScroll);
  
  // Make navigation sticky on scroll
  const navbar = document.querySelector('.navbar');
  let navbarOffset = navbar.offsetTop;
  
  const stickyNav = () => {
    if (window.pageYOffset > navbarOffset) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
  };
  
  window.addEventListener('scroll', stickyNav);
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile navigation toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active');
    });
    // Optional: close menu when a link is clicked (for better UX)
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
      });
    });
  }

  startTeamSlider();
});

// Auto-slide for team-cards horizontal slider
function startTeamSlider() {
  const slider = document.querySelector('.team-cards.slider');
  if (!slider) return;
  const cards = slider.querySelectorAll('.team-card');
  if (cards.length < 2) return;
  let index = 0;
  const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(slider).gap || 0);
  const visibleCards = Math.floor(slider.offsetWidth / cardWidth);
  const maxIndex = cards.length - visibleCards >= 0 ? cards.length - visibleCards : 0;

  setInterval(() => {
    index = (index + 1) > maxIndex ? 0 : index + 1;
    slider.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  }, 2000); // 2 seconds for smoother UX
}

// Mobile navigation toggle (for future implementation)
document.addEventListener('DOMContentLoaded', function() {
  // This is a placeholder for mobile menu toggle functionality
  // Will be implemented when the mobile menu is added
  
  // Example of what will be added:
  // const mobileMenuButton = document.querySelector('.mobile-menu-button');
  // const navLinks = document.querySelector('.nav-links');
  
  // if (mobileMenuButton) {
  //   mobileMenuButton.addEventListener('click', function() {
  //     navLinks.classList.toggle('active');
  //     mobileMenuButton.classList.toggle('active');
  //   });
  // }
});