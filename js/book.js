// Booking Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Variables
  let selectedService = '';
  let selectedDate = '';
  let selectedTime = '';
  
  // Step navigation
  const steps = document.querySelectorAll('.step');
  const formSteps = document.querySelectorAll('.form-step');
  const nextButtons = document.querySelectorAll('.next-step');
  const prevButtons = document.querySelectorAll('.prev-step');
  
  // Service selection
  const serviceOptions = document.querySelectorAll('.service-option');
  const serviceButtons = document.querySelectorAll('.service-select');
  
  // Time selection
  const timeOptions = document.querySelectorAll('.time-option');
  
  // Form submission
  const bookingForm = document.getElementById('booking-info-form');
  
  // Initialize current step
  let currentStep = 1;
  
  // Service selection
  serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove selected class from all options
      serviceOptions.forEach(option => {
        option.classList.remove('selected');
      });
      
      // Add selected class to parent option
      this.closest('.service-option').classList.add('selected');
      
      // Store selected service
      selectedService = this.getAttribute('data-service');
      
      // Enable the continue button
      document.querySelector(`[data-next="2"]`).removeAttribute('disabled');
    });
  });
  
  // Time slot selection
  timeOptions.forEach(time => {
    time.addEventListener('click', function() {
      // Remove selected class from all time slots
      timeOptions.forEach(t => {
        t.classList.remove('selected');
      });
      
      // Add selected class to this time slot
      this.classList.add('selected');
      
      // Store selected time
      selectedTime = this.textContent;
      
      // Enable the continue button
      document.querySelector(`[data-next="3"]`).removeAttribute('disabled');
    });
  });
  
  // Calendar functionality
  initCalendar();
  
  // Next buttons
  nextButtons.forEach(button => {
    button.addEventListener('click', function() {
      const nextStep = parseInt(this.getAttribute('data-next'));
      
      // Validate current step before proceeding
      if (validateStep(currentStep)) {
        goToStep(nextStep);
      }
    });
  });
  
  // Previous buttons
  prevButtons.forEach(button => {
    button.addEventListener('click', function() {
      const prevStep = parseInt(this.getAttribute('data-prev'));
      goToStep(prevStep);
    });
  });
  
  // Form submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (validateStep(3)) {
        // Get form data
        const formData = {
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          phone: document.getElementById('phone').value,
          notes: document.getElementById('notes').value,
          service: selectedService,
          date: selectedDate,
          time: selectedTime
        };
        
        // Save booking data (in a real app, this would be sent to a server)
        console.log('Booking data:', formData);
        
        // Show confirmation
        document.getElementById('confirm-service').textContent = formData.service;
        document.getElementById('confirm-date').textContent = formData.date;
        document.getElementById('confirm-time').textContent = formData.time;
        document.getElementById('confirm-name').textContent = formData.name;
        
        // Hide form steps and show confirmation
        formSteps.forEach(step => {
          step.classList.remove('active');
        });
        document.getElementById('confirmation').classList.add('active');
        
        // Update progress indicators
        steps.forEach(step => {
          step.classList.add('completed');
        });
      }
    });
  }
  
  // Validate current step
  function validateStep(step) {
    switch(step) {
      case 1:
        // Check if a service is selected
        if (!selectedService) {
          alert('Please select a service to continue.');
          return false;
        }
        return true;
        
      case 2:
        // Check if date and time are selected
        if (!selectedDate || !selectedTime) {
          alert('Please select both date and time to continue.');
          return false;
        }
        return true;
        
      case 3:
        // Form validation will be handled by HTML5 validation
        return true;
        
      default:
        return true;
    }
  }
  
  // Navigate to a step
  function goToStep(step) {
    // Hide all form steps
    formSteps.forEach(formStep => {
      formStep.classList.remove('active');
    });
    
    // Show the target step
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update progress indicators
    steps.forEach(s => {
      const stepNum = parseInt(s.getAttribute('data-step'));
      
      if (stepNum < step) {
        s.classList.add('completed');
        s.classList.remove('active');
      } else if (stepNum === step) {
        s.classList.add('active');
        s.classList.remove('completed');
      } else {
        s.classList.remove('active', 'completed');
      }
    });
    
    // Update current step
    currentStep = step;
    
    // Scroll to top of form
    document.querySelector('.booking-container').scrollIntoView({ behavior: 'smooth' });
  }
  
  // Initialize calendar
  function initCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Generate calendar for current month
    generateCalendar(currentMonth, currentYear);
    
    // Add event listeners for month navigation
    document.querySelector('.month-nav.prev').addEventListener('click', function() {
      const currentMonthDisplay = document.querySelector('.current-month').textContent;
      const [monthName, year] = currentMonthDisplay.split(' ');
      const monthIndex = getMonthIndex(monthName);
      
      let newMonth, newYear;
      
      if (monthIndex === 0) {
        newMonth = 11; // December
        newYear = parseInt(year) - 1;
      } else {
        newMonth = monthIndex - 1;
        newYear = parseInt(year);
      }
      
      generateCalendar(newMonth, newYear);
    });
    
    document.querySelector('.month-nav.next').addEventListener('click', function() {
      const currentMonthDisplay = document.querySelector('.current-month').textContent;
      const [monthName, year] = currentMonthDisplay.split(' ');
      const monthIndex = getMonthIndex(monthName);
      
      let newMonth, newYear;
      
      if (monthIndex === 11) {
        newMonth = 0; // January
        newYear = parseInt(year) + 1;
      } else {
        newMonth = monthIndex + 1;
        newYear = parseInt(year);
      }
      
      generateCalendar(newMonth, newYear);
    });
  }
  
  // Generate calendar for a specific month and year
  function generateCalendar(month, year) {
    const daysContainer = document.querySelector('.days');
    const monthYearDisplay = document.querySelector('.current-month');
    
    // Clear previous days
    daysContainer.innerHTML = '';
    
    // Update month and year display
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearDisplay.textContent = `${monthNames[month]} ${year}`;
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Adjust for Monday as first day of week (0 = Sunday, 1 = Monday, etc.)
    const firstDayAdjusted = firstDay === 0 ? 6 : firstDay - 1;
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayAdjusted; i++) {
      const emptyDay = document.createElement('button');
      emptyDay.disabled = true;
      emptyDay.classList.add('disabled');
      daysContainer.appendChild(emptyDay);
    }
    
    // Add days of the month
    const today = new Date();
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayButton = document.createElement('button');
      dayButton.textContent = i;
      
      // Check if this day is in the past
      const currentDate = new Date(year, month, i);
      
      if (currentDate < new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
        dayButton.disabled = true;
        dayButton.classList.add('disabled');
      } else {
        // Add click event to select date
        dayButton.addEventListener('click', function() {
          // Remove selected class from all days
          document.querySelectorAll('.days button').forEach(day => {
            day.classList.remove('selected');
          });
          
          // Add selected class to this day
          this.classList.add('selected');
          
          // Store selected date
          selectedDate = `${monthNames[month]} ${i}, ${year}`;
          
          // Enable time selection based on selected date
          // Here you would typically load available time slots from the server
          enableTimeSlots();
        });
      }
      
      // Highlight today
      if (i === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
        dayButton.classList.add('today');
      }
      
      daysContainer.appendChild(dayButton);
    }
  }
  
  // Convert month name to index (0-11)
  function getMonthIndex(monthName) {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames.findIndex(month => month === monthName);
  }
  
  // Enable time slots after date selection (simplified)
  function enableTimeSlots() {
    // In a real app, this would fetch available times from the server
    // For demo purposes, we'll just enable all time slots
    timeOptions.forEach(time => {
      time.disabled = false;
      time.classList.remove('disabled');
    });
  }
}); 