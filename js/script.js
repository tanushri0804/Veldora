// Main Script File

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (menuToggle && mainNav) {
      menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
      });
    }
    
    // Header Scroll Effect
    const header = document.querySelector('.main-header');
    if (header) {
      window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
    
    // Hero Slider
    const heroSlider = document.querySelector('.hero-slider');
    if (heroSlider) {
      const slides = document.querySelectorAll('.slide');
      const dotsContainer = document.querySelector('.slider-dots');
      const prevBtn = document.querySelector('.slider-prev');
      const nextBtn = document.querySelector('.slider-next');
      
      let currentSlide = 0;
      const slideCount = slides.length;
      
      // Create dots
      for (let i = 0; i < slideCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
      }
      
      const dots = document.querySelectorAll('.dot');
      
      function goToSlide(slideIndex) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        currentSlide = slideIndex;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
      }
      
      function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        goToSlide(currentSlide);
      }
      
      function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        goToSlide(currentSlide);
      }
      
      if (nextBtn) nextBtn.addEventListener('click', nextSlide);
      if (prevBtn) prevBtn.addEventListener('click', prevSlide);
      
      // Auto slide change
      let slideInterval = setInterval(nextSlide, 5000);
      
      // Pause on hover
      heroSlider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
      });
      
      heroSlider.addEventListener('mouseleave', () => {
        slideInterval = setInterval(nextSlide, 5000);
      });
    }
    
    // Testimonials Slider
    const testimonialsSlider = document.querySelector('.testimonials-slider');
    if (testimonialsSlider) {
      const testimonials = document.querySelectorAll('.testimonial');
      const dotsContainer = document.querySelector('.testimonials-section .slider-dots');
      
      let currentTestimonial = 0;
      const testimonialCount = testimonials.length;
      
      // Create dots
      for (let i = 0; i < testimonialCount; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToTestimonial(i));
        dotsContainer.appendChild(dot);
      }
      
      const testimonialDots = document.querySelectorAll('.testimonials-section .dot');
      
      function goToTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        currentTestimonial = index;
        testimonials[currentTestimonial].classList.add('active');
        testimonialDots[currentTestimonial].classList.add('active');
      }
      
      // Auto testimonial change
      setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCount;
        goToTestimonial(currentTestimonial);
      }, 7000);
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Initialize animations
    initAnimations();
  });
  
  // Initialize animations
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