// Animation Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initAnimations();
    
    // Add hover effects to elements with specific classes
    addHoverEffects();
  });
  
  function initAnimations() {
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .zoom-effect');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  function addHoverEffects() {
    // Add hover-grow effect
    const hoverGrowElements = document.querySelectorAll('.hover-grow');
    hoverGrowElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
      });
    });
    
    // Add hover-float effect
    const hoverFloatElements = document.querySelectorAll('.hover-float');
    hoverFloatElements.forEach(element => {
      element.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
      });
      
      element.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
      });
    });
  }
  
  // Start pulse animation when element is visible
  function startPulseAnimation(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'pulse 2s infinite';
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(element);
  }
  
  // Start float animation when element is visible
  function startFloatAnimation(element) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'float 3s ease-in-out infinite';
          observer.unobserve(entry.target);
        }
      });
    });
    
    observer.observe(element);
  }