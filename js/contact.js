// Contact Page Scripts
document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
      const question = item.querySelector('.faq-question');
      
      question.addEventListener('click', () => {
        // Close all other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simple validation
        if (!name || !email || !subject || !message) {
          showAlert('Please fill in all required fields', 'error');
          return;
        }
        
        // Simulate form submission
        showAlert('Sending your message...', 'info');
        
        setTimeout(() => {
          // In a real app, you would make an API call here
          showAlert('Message sent successfully!', 'success');
          contactForm.reset();
        }, 1500);
      });
    }
    
    // Show alert function
    function showAlert(message, type) {
      // Remove any existing alerts
      const existingAlert = document.querySelector('.contact-alert');
      if (existingAlert) existingAlert.remove();
      
      const alert = document.createElement('div');
      alert.className = `contact-alert alert-${type}`;
      alert.textContent = message;
      
      document.body.appendChild(alert);
      
      // Position the alert
      alert.style.top = '20px';
      
      // Remove alert after 3 seconds
      setTimeout(() => {
        alert.remove();
      }, 3000);
    }
  });
  
  // Add alert styles
  const style = document.createElement('style');
  style.textContent = `
    .contact-alert {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 30px;
      border-radius: 5px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      animation: slideDown 0.3s ease-out;
    }
    
    .alert-error {
      background-color: #e74c3c;
    }
    
    .alert-success {
      background-color: #2ecc71;
    }
    
    .alert-info {
      background-color: #3498db;
    }
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translate(-50%, -20px);
      }
      to {
        opacity: 1;
        transform: translate(-50%, 0);
      }
    }
  `;
  document.head.appendChild(style);