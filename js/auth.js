// Authentication Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Form Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const authForms = document.querySelectorAll('.auth-form');
    
    tabButtons.forEach(button => {
      button.addEventListener('click', function() {
        const tabId = this.getAttribute('data-tab');
        
        // Update active tab
        tabButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        // Show corresponding form
        authForms.forEach(form => {
          form.classList.remove('active');
          if (form.id === `${tabId}-form`) {
            form.classList.add('active');
          }
        });
      });
    });
    
    // Show/Hide Password
    const showPasswordButtons = document.querySelectorAll('.show-password');
    showPasswordButtons.forEach(button => {
      button.addEventListener('click', function() {
        const input = this.previousElementSibling;
        const icon = this.querySelector('i');
        
        if (input.type === 'password') {
          input.type = 'text';
          icon.classList.remove('fa-eye');
          icon.classList.add('fa-eye-slash');
        } else {
          input.type = 'password';
          icon.classList.remove('fa-eye-slash');
          icon.classList.add('fa-eye');
        }
      });
    });
    
    // Login Form Submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        
        // Simple validation
        if (!email || !password) {
          showAlert('Please fill in all fields', 'error');
          return;
        }
        
        // Simulate login process
        showAlert('Logging in...', 'info');
        
        setTimeout(() => {
          // In a real app, you would make an API call here
          showAlert('Login successful! Redirecting...', 'success');
          
          // Redirect to main page after 1.5 seconds
          setTimeout(() => {
            window.location.href = 'main.html';
          }, 1500);
        }, 1000);
      });
    }
    
    // Signup Form Submission
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
      signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signup-name').value;
        const email = document.getElementById('signup-email').value;
        const phone = document.getElementById('signup-phone').value;
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm').value;
        const terms = document.getElementById('terms').checked;
        
        // Validation
        if (!name || !email || !password || !confirmPassword) {
          showAlert('Please fill in all required fields', 'error');
          return;
        }
        
        if (password !== confirmPassword) {
          showAlert('Passwords do not match', 'error');
          return;
        }
        
        if (!terms) {
          showAlert('You must agree to the terms and conditions', 'error');
          return;
        }
        
        // Simulate signup process
        showAlert('Creating your account...', 'info');
        
        setTimeout(() => {
          // In a real app, you would make an API call here
          showAlert('Account created successfully! Redirecting...', 'success');
          
          // Redirect to main page after 1.5 seconds
          setTimeout(() => {
            window.location.href = 'main.html';
          }, 1500);
        }, 1000);
      });
    }
    
    // Show alert function
    function showAlert(message, type) {
      // Remove any existing alerts
      const existingAlert = document.querySelector('.alert');
      if (existingAlert) existingAlert.remove();
      
      const alert = document.createElement('div');
      alert.className = `alert alert-${type}`;
      alert.textContent = message;
      
      document.body.appendChild(alert);
      
      // Position the alert
      const authContainer = document.querySelector('.auth-form-container');
      if (authContainer) {
        alert.style.top = `${authContainer.offsetTop - 60}px`;
      } else {
        alert.style.top = '20px';
      }
      
      // Remove alert after 3 seconds
      setTimeout(() => {
        alert.remove();
      }, 3000);
    }
  });
  
  // Show alert styles (would be added to CSS)
  const style = document.createElement('style');
  style.textContent = `
    .alert {
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