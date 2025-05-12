// Dining Page Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Restaurant reservation modal
    const reserveButtons = document.querySelectorAll('.btn-reserve');
    const modal = document.createElement('div');
    modal.className = 'reservation-modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h2>Make a Reservation</h2>
        <form id="reservationForm">
          <div class="form-group">
            <label for="reservation-name">Full Name</label>
            <input type="text" id="reservation-name" required>
          </div>
          <div class="form-group">
            <label for="reservation-email">Email</label>
            <input type="email" id="reservation-email" required>
          </div>
          <div class="form-group">
            <label for="reservation-phone">Phone Number</label>
            <input type="tel" id="reservation-phone" required>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label for="reservation-date">Date</label>
              <input type="date" id="reservation-date" required>
            </div>
            <div class="form-group">
              <label for="reservation-time">Time</label>
              <input type="time" id="reservation-time" required>
            </div>
          </div>
          <div class="form-group">
            <label for="reservation-guests">Number of Guests</label>
            <select id="reservation-guests" required>
              <option value="1">1 Person</option>
              <option value="2" selected>2 People</option>
              <option value="3">3 People</option>
              <option value="4">4 People</option>
              <option value="5">5 People</option>
              <option value="6">6 People</option>
              <option value="7">7 People</option>
              <option value="8">8+ People</option>
            </select>
          </div>
          <div class="form-group">
            <label for="reservation-notes">Special Requests (Optional)</label>
            <textarea id="reservation-notes" rows="3"></textarea>
          </div>
          <button type="submit" class="btn-submit">Confirm Reservation</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);
  
    // Open modal when reserve button is clicked
    reserveButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();
        const restaurant = this.closest('.restaurant-card').querySelector('h3').textContent;
        modal.querySelector('h2').textContent = `Reservation at ${restaurant}`;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Close modal
    modal.querySelector('.close-modal').addEventListener('click', function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  
    // Form submission
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
      reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('reservation-name').value;
        const email = document.getElementById('reservation-email').value;
        const phone = document.getElementById('reservation-phone').value;
        const date = document.getElementById('reservation-date').value;
        const time = document.getElementById('reservation-time').value;
        const guests = document.getElementById('reservation-guests').value;
        
        // Simple validation
        if (!name || !email || !phone || !date || !time || !guests) {
          showAlert('Please fill in all required fields', 'error');
          return;
        }
        
        // Simulate form submission
        showAlert('Processing your reservation...', 'info');
        
        setTimeout(() => {
          // In a real app, you would make an API call here
          showAlert('Reservation confirmed! A confirmation has been sent to your email.', 'success');
          reservationForm.reset();
          modal.style.display = 'none';
          document.body.style.overflow = 'auto';
        }, 1500);
      });
    }
  
    // Set minimum date for reservation (today)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    if (document.getElementById('reservation-date')) {
      document.getElementById('reservation-date').min = formatDate(tomorrow);
    }
  
    // Show alert function
    function showAlert(message, type) {
      // Remove any existing alerts
      const existingAlert = document.querySelector('.dining-alert');
      if (existingAlert) existingAlert.remove();
      
      const alert = document.createElement('div');
      alert.className = `dining-alert alert-${type}`;
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
  
  // Add modal and alert styles
  const style = document.createElement('style');
  style.textContent = `
    .reservation-modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 1000;
      overflow-y: auto;
    }
    
    .modal-content {
      background-color: white;
      margin: 50px auto;
      padding: 30px;
      border-radius: var(--border-radius);
      max-width: 600px;
      width: 90%;
      position: relative;
      animation: modalFadeIn 0.3s ease-out;
    }
    
    .close-modal {
      position: absolute;
      top: 15px;
      right: 15px;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--text-light);
      transition: var(--transition);
    }
    
    .close-modal:hover {
      color: var(--primary-color);
    }
    
    .modal-content h2 {
      margin-bottom: 20px;
      color: var(--primary-color);
    }
    
    #reservationForm .form-group {
      margin-bottom: 20px;
    }
    
    #reservationForm label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: var(--primary-color);
    }
    
    #reservationForm input,
    #reservationForm select,
    #reservationForm textarea {
      width: 100%;
      padding: 12px 15px;
      border: 1px solid #ddd;
      border-radius: var(--border-radius);
      font-size: 1rem;
    }
    
    #reservationForm .form-row {
      display: flex;
      gap: 20px;
    }
    
    #reservationForm .form-row .form-group {
      flex: 1;
    }
    
    .btn-submit {
      width: 100%;
      padding: 15px;
      background-color: var(--primary-color);
      color: white;
      border: none;
      border-radius: var(--border-radius);
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
    }
    
    .btn-submit:hover {
      background-color: #052435;
    }
    
    @keyframes modalFadeIn {
      from {
        opacity: 0;
        transform: translateY(-20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .dining-alert {
      position: fixed;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 30px;
      border-radius: 5px;
      color: white;
      font-weight: 500;
      z-index: 1001;
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