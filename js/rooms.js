// Rooms Page Scripts
document.addEventListener('DOMContentLoaded', function() {
    // Room Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const roomCards = document.querySelectorAll('.room-card');
    
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        
        const filter = this.getAttribute('data-filter');
        
        // Filter rooms
        roomCards.forEach(card => {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = 'block';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
    
    // Initialize image hover effects
    initImageHoverEffects();
  });
  
  function initImageHoverEffects() {
    const roomImages = document.querySelectorAll('.room-image');
    
    roomImages.forEach(image => {
      image.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        img.style.transform = 'scale(1.05)';
      });
      
      image.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        img.style.transform = 'scale(1)';
      });
    });
  }