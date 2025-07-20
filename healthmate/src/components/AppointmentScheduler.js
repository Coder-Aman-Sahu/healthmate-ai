import React, { useState } from 'react';
import '../styles/AppointmentScheduler.css';

const AppointmentScheduler = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, date: '2024-07-15', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Routine Checkup', status: 'confirmed' },
    { id: 2, date: '2024-07-20', time: '2:30 PM', doctor: 'Dr. Johnson', type: 'Cardiology', status: 'pending' },
    { id: 3, date: '2024-07-25', time: '9:00 AM', doctor: 'Dr. Williams', type: 'Dermatology', status: 'confirmed' }
  ]);

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [showBookingForm, setShowBookingForm] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialty: 'Internal Medicine', available: true },
    { id: 2, name: 'Dr. Michael Johnson', specialty: 'Cardiology', available: true },
    { id: 3, name: 'Dr. Emily Williams', specialty: 'Dermatology', available: false },
    { id: 4, name: 'Dr. David Brown', specialty: 'Orthopedics', available: true },
    { id: 5, name: 'Dr. Lisa Davis', specialty: 'Pediatrics', available: true }
  ];

  const appointmentTypes = [
    'Routine Checkup',
    'Follow-up',
    'Consultation',
    'Physical Exam',
    'Urgent Care',
    'Specialist Visit'
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM'
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return '#2ed573';
      case 'pending': return '#ffa502';
      case 'cancelled': return '#ff4757';
      case 'completed': return '#57606f';
      default: return '#57606f';
    }
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime || !selectedDoctor || !appointmentType) {
      alert('Please fill in all required fields');
      return;
    }

    const newAppointment = {
      id: Date.now(),
      date: selectedDate,
      time: selectedTime,
      doctor: selectedDoctor,
      type: appointmentType,
      status: 'pending'
    };

    setAppointments([...appointments, newAppointment]);
    setShowBookingForm(false);
    setSelectedDate('');
    setSelectedTime('');
    setSelectedDoctor('');
    setAppointmentType('');
  };

  const cancelAppointment = (id) => {
    setAppointments(appointments.map(apt => 
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    ));
  };

  const rescheduleAppointment = (id) => {
    // In a real app, this would open a reschedule dialog
    alert('Reschedule functionality would be implemented here');
  };

  const getDaysFromToday = (days) => {
    const today = new Date();
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + days);
    return futureDate.toISOString().split('T')[0];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="appointment-scheduler">
      <div className="scheduler-header">
        <h1>Appointment Scheduler</h1>
        <button 
          className="book-btn"
          onClick={() => setShowBookingForm(true)}
        >
          Book New Appointment
        </button>
      </div>

      <div className="appointments-overview">
        <div className="overview-stats">
          <div className="stat-card">
            <div className="stat-number">
              {appointments.filter(apt => apt.status === 'confirmed').length}
            </div>
            <div className="stat-label">Confirmed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {appointments.filter(apt => apt.status === 'pending').length}
            </div>
            <div className="stat-label">Pending</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {appointments.length}
            </div>
            <div className="stat-label">Total</div>
          </div>
        </div>
      </div>

      <div className="appointments-section">
        <h2>Your Appointments</h2>
        <div className="appointments-list">
          {appointments.map(appointment => (
            <div key={appointment.id} className="appointment-card">
              <div className="appointment-date">
                <div className="date-day">{formatDate(appointment.date)}</div>
                <div className="date-time">{appointment.time}</div>
              </div>
              
              <div className="appointment-details">
                <div className="appointment-doctor">{appointment.doctor}</div>
                <div className="appointment-type">{appointment.type}</div>
              </div>
              
              <div className="appointment-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(appointment.status) }}
                >
                  {appointment.status}
                </span>
              </div>
              
              <div className="appointment-actions">
                {appointment.status === 'confirmed' && (
                  <>
                    <button 
                      className="action-btn small"
                      onClick={() => rescheduleAppointment(appointment.id)}
                    >
                      Reschedule
                    </button>
                    <button 
                      className="action-btn small cancel"
                      onClick={() => cancelAppointment(appointment.id)}
                    >
                      Cancel
                    </button>
                  </>
                )}
                {appointment.status === 'pending' && (
                  <button 
                    className="action-btn small cancel"
                    onClick={() => cancelAppointment(appointment.id)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="doctors-section">
        <h2>Available Doctors</h2>
        <div className="doctors-grid">
          {doctors.map(doctor => (
            <div key={doctor.id} className={`doctor-card ${!doctor.available ? 'unavailable' : ''}`}>
              <div className="doctor-avatar">👨‍⚕️</div>
              <div className="doctor-info">
                <div className="doctor-name">{doctor.name}</div>
                <div className="doctor-specialty">{doctor.specialty}</div>
                <div className={`doctor-availability ${doctor.available ? 'available' : 'unavailable'}`}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showBookingForm && (
        <div className="booking-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Book New Appointment</h3>
              <button 
                className="close-btn"
                onClick={() => setShowBookingForm(false)}
              >
                ×
              </button>
            </div>
            
            <div className="booking-form">
              <div className="form-group">
                <label>Select Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={getDaysFromToday(1)}
                  max={getDaysFromToday(90)}
                />
              </div>
              
              <div className="form-group">
                <label>Select Time:</label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <option value="">Choose time slot</option>
                  {timeSlots.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Select Doctor:</label>
                <select 
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  <option value="">Choose doctor</option>
                  {doctors.filter(doc => doc.available).map(doctor => (
                    <option key={doctor.id} value={doctor.name}>
                      {doctor.name} - {doctor.specialty}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Appointment Type:</label>
                <select 
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                >
                  <option value="">Choose type</option>
                  {appointmentTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label>Notes (Optional):</label>
                <textarea 
                  placeholder="Any additional information or symptoms..."
                  rows="3"
                />
              </div>
            </div>
            
            <div className="modal-actions">
              <button 
                className="action-btn primary"
                onClick={handleBookAppointment}
              >
                Book Appointment
              </button>
              <button 
                className="action-btn secondary"
                onClick={() => setShowBookingForm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
