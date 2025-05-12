// Booking Page Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Form Elements
    const bookingForm = document.getElementById('bookingForm');
    const checkInInput = document.getElementById('check-in');
    const checkOutInput = document.getElementById('check-out');
    const adultsSelect = document.getElementById('adults');
    const childrenSelect = document.getElementById('children');
    const roomOptions = document.querySelectorAll('input[name="room-type"]');
    
    // Summary Elements
    const summaryCheckIn = document.getElementById('summary-checkin');
    const summaryCheckOut = document.getElementById('summary-checkout');
    const summaryNights = document.getElementById('summary-nights');
    const summaryRoom = document.getElementById('summary-room');
    const summaryRoomPrice = document.getElementById('summary-room-price');
    const summaryTaxes = document.getElementById('summary-taxes');
    const summaryTotal = document.getElementById('summary-total');
    
    // Room Data
    const rooms = {
      deluxe: {
        name: 'Deluxe Room',
        price: 299,
        description: 'Spacious accommodations with premium amenities and stunning city views.'
      },
      executive: {
        name: 'Executive Suite',
        price: 499,
        description: 'Sophisticated living space with separate lounge area and premium amenities.'
      },
      presidential: {
        name: 'Presidential Suite',
        price: 899,
        description: 'Ultimate luxury with expansive space, premium furnishings and panoramic views.'
      }
    };
    
    // Set minimum date for check-in (today)
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };
    
    checkInInput.min = formatDate(today);
    checkOutInput.min = formatDate(tomorrow);
    
    // Update check-out min date when check-in changes
    checkInInput.addEventListener('change', function() {
      if (this.value) {
        const checkInDate = new Date(this.value);
        const nextDay = new Date(checkInDate);
        nextDay.setDate(nextDay.getDate() + 1);
        checkOutInput.min = formatDate(nextDay);
        
        // If current check-out is before new min, reset it
        if (checkOutInput.value && new Date(checkOutInput.value) < nextDay) {
          checkOutInput.value = '';
        }
      }
      updateBookingSummary();
    });
    
    // Update summary when any input changes
    checkOutInput.addEventListener('change', updateBookingSummary);
    adultsSelect.addEventListener('change', updateBookingSummary);
    childrenSelect.addEventListener('change', updateBookingSummary);
    
    // Update summary when room selection changes
    roomOptions.forEach(option => {
      option.addEventListener('change', updateBookingSummary);
    });
    
    // Initialize summary
    updateBookingSummary();
    
    // Form submission
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (!checkInInput.value || !checkOutInput.value) {
        showAlert('Please select check-in and check-out dates', 'error');
        return;
      }
      
      // Get selected room
      let selectedRoom = null;
      roomOptions.forEach(option => {
        if (option.checked) {
          selectedRoom = option.value;
        }
      });
      
      if (!selectedRoom) {
        showAlert('Please select a room type', 'error');
        return;
      }
      
      // In a real app, you would proceed to payment here
      showAlert('Redirecting to payment...', 'info');
      
      // Simulate redirect to payment page
      setTimeout(() => {
        window.location.href = 'payment.html';
      }, 1500);
    });
    
    // Update booking summary
    function updateBookingSummary() {
      // Dates
      if (checkInInput.value) {
        const checkInDate = new Date(checkInInput.value);
        summaryCheckIn.textContent = formatDisplayDate(checkInDate);
      } else {
        summaryCheckIn.textContent = '--/--/----';
      }
      
      if (checkOutInput.value) {
        const checkOutDate = new Date(checkOutInput.value);
        summaryCheckOut.textContent = formatDisplayDate(checkOutDate);
      } else {
        summaryCheckOut.textContent = '--/--/----';
      }
      
      // Calculate nights
      let nights = 0;
      if (checkInInput.value && checkOutInput.value) {
        const checkIn = new Date(checkInInput.value);
        const checkOut = new Date(checkOutInput.value);
        nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      }
      summaryNights.textContent = nights;
      
      // Selected room
      let selectedRoom = null;
      roomOptions.forEach(option => {
        if (option.checked) {
          selectedRoom = option.value;
        }
      });
      
      if (selectedRoom) {
        const room = rooms[selectedRoom];
        summaryRoom.innerHTML = `
          <h4>${room.name}</h4>
          <p>${room.description}</p>
        `;
        
        // Calculate prices
        const roomPrice = room.price * nights;
        const taxes = roomPrice * 0.12; // 12% tax
        const total = roomPrice + taxes;
        
        summaryRoomPrice.textContent = `$${roomPrice.toFixed(2)}`;
        summaryTaxes.textContent = `$${taxes.toFixed(2)}`;
        summaryTotal.textContent = `$${total.toFixed(2)}`;
      } else {
        summaryRoom.innerHTML = '<p>No room selected yet</p>';
        summaryRoomPrice.textContent = '$0';
        summaryTaxes.textContent = '$0';
        summaryTotal.textContent = '$0';
      }
    }
    
    // Format date for display (MM/DD/YYYY)
    function formatDisplayDate(date) {
      return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      });
    }
    
    // Show alert function
    function showAlert(message, type) {
      // Remove any existing alerts
      const existingAlert = document.querySelector('.booking-alert');
      if (existingAlert) existingAlert.remove();
      
      const alert = document.createElement('div');
      alert.className = `booking-alert alert-${type}`;
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
    .booking-alert {
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