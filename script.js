let schedules = JSON.parse(localStorage.getItem('schedules')) || [];
let daySchedules = [];

// Google Maps API callback function
function initMap() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 0, lng: 0 },
        zoom: 2
    });
}

// Function to render schedule items
function renderSchedules() {
    const scheduleList = document.getElementById('schedule-items');
    scheduleList.innerHTML = '';
    schedules.forEach((schedule, index) => {
        const scheduleItem = document.createElement('div');
        scheduleItem.classList.add('schedule-item');
        scheduleItem.innerHTML = `
            <p><strong>Destination:</strong> ${schedule.destination}</p>
            <p><strong>Date:</strong> ${schedule.date}</p>
            <button onclick="deleteSchedule(${index})">Delete</button>
        `;
        scheduleList.appendChild(scheduleItem);
    });
}

// Function to render day-by-day schedules
function renderDaySchedules() {
    const daySchedulesElement = document.getElementById('day-schedules');
    daySchedulesElement.innerHTML = '';
    daySchedules.forEach((day, index) => {
        const dayScheduleItem = document.createElement('div');
        dayScheduleItem.classList.add('day-schedule-item');
        dayScheduleItem.innerHTML = `
            <h3>Day ${index + 1}</h3>
            <ul>
                ${day.map(item => `<li>${item.destination} - ${item.date}</li>`).join('')}
            </ul>
        `;
        daySchedulesElement.appendChild(dayScheduleItem);
    });
}

// Function to add a new schedule
function addSchedule(destination, date) {
    const newSchedule = {
        destination,
        date
    };
    schedules.push(newSchedule);
    localStorage.setItem('schedules', JSON.stringify(schedules));
    renderSchedules();
}

// Function to delete a schedule
function deleteSchedule(index) {
    schedules.splice(index, 1);
    localStorage.setItem('schedules', JSON.stringify(schedules));
    renderSchedules();
}

// Function to add a new day schedule
function addDaySchedule(day) {
    daySchedules.push(day);
    renderDaySchedules();
}

// Event listener for form submission
const scheduleForm = document.getElementById('new-schedule-form');
scheduleForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;
    addSchedule(destination, date);
    scheduleForm.reset();
});

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
});

// Example usage: addDaySchedule([{ destination: 'Destination 1', date: '2024-08-01' }]);
