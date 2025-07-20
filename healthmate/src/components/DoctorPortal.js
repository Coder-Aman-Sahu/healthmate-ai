import React, { useState } from 'react';
import '../styles/DoctorPortal.css';

const DoctorPortal = () => {
  const [doctorData] = useState({
    name: 'Dr. Sarah Wilson',
    specialization: 'Internal Medicine',
    patients: [
      { id: 1, name: 'John Doe', age: 45, lastVisit: '2024-06-15', condition: 'Hypertension', priority: 'medium' },
      { id: 2, name: 'Jane Smith', age: 32, lastVisit: '2024-07-10', condition: 'Diabetes', priority: 'high' },
      { id: 3, name: 'Robert Johnson', age: 58, lastVisit: '2024-07-05', condition: 'Routine Checkup', priority: 'low' }
    ],
    todaySchedule: [
      { time: '9:00 AM', patient: 'Alice Brown', type: 'Consultation' },
      { time: '10:30 AM', patient: 'David Wilson', type: 'Follow-up' },
      { time: '2:00 PM', patient: 'Emma Davis', type: 'Physical Exam' },
      { time: '3:30 PM', patient: 'Michael Lee', type: 'Consultation' }
    ],
    statistics: {
      totalPatients: 156,
      todayAppointments: 8,
      pendingReports: 12,
      completedToday: 4
    }
  });

  const [selectedPatient, setSelectedPatient] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#57606f';
    }
  };

  return (
    <div className="doctor-portal">
      <div className="portal-header">
        <h1>Doctor Portal</h1>
        <p>Welcome, {doctorData.name} - {doctorData.specialization}</p>
      </div>

      <div className="portal-stats">
        <div className="stat-card">
          <div className="stat-number">{doctorData.statistics.totalPatients}</div>
          <div className="stat-label">Total Patients</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{doctorData.statistics.todayAppointments}</div>
          <div className="stat-label">Today's Appointments</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{doctorData.statistics.pendingReports}</div>
          <div className="stat-label">Pending Reports</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{doctorData.statistics.completedToday}</div>
          <div className="stat-label">Completed Today</div>
        </div>
      </div>

      <div className="portal-content">
        <div className="schedule-section">
          <div className="card">
            <h2>Today's Schedule</h2>
            <div className="schedule-list">
              {doctorData.todaySchedule.map((appointment, index) => (
                <div key={index} className="schedule-item">
                  <div className="schedule-time">{appointment.time}</div>
                  <div className="schedule-details">
                    <div className="patient-name">{appointment.patient}</div>
                    <div className="appointment-type">{appointment.type}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="patients-section">
          <div className="card">
            <h2>Patient List</h2>
            <div className="patients-list">
              {doctorData.patients.map((patient) => (
                <div 
                  key={patient.id} 
                  className="patient-item"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <div className="patient-info">
                    <div className="patient-name">{patient.name}</div>
                    <div className="patient-details">
                      <span>Age: {patient.age}</span>
                      <span>Last Visit: {patient.lastVisit}</span>
                    </div>
                  </div>
                  <div className="patient-condition">
                    <span className="condition">{patient.condition}</span>
                    <span 
                      className="priority-badge"
                      style={{ backgroundColor: getPriorityColor(patient.priority) }}
                    >
                      {patient.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {selectedPatient && (
        <div className="patient-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Patient Details: {selectedPatient.name}</h3>
              <button 
                className="close-btn"
                onClick={() => setSelectedPatient(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="patient-detail">
                <strong>Age:</strong> {selectedPatient.age}
              </div>
              <div className="patient-detail">
                <strong>Last Visit:</strong> {selectedPatient.lastVisit}
              </div>
              <div className="patient-detail">
                <strong>Condition:</strong> {selectedPatient.condition}
              </div>
              <div className="patient-detail">
                <strong>Priority:</strong> 
                <span 
                  className="priority-badge"
                  style={{ backgroundColor: getPriorityColor(selectedPatient.priority) }}
                >
                  {selectedPatient.priority}
                </span>
              </div>
            </div>
            <div className="modal-actions">
              <button className="action-btn primary">View Full Records</button>
              <button className="action-btn secondary">Schedule Appointment</button>
              <button className="action-btn secondary">Send Message</button>
            </div>
          </div>
        </div>
      )}

      <div className="portal-actions">
        <button className="action-btn primary">Add New Patient</button>
        <button className="action-btn secondary">Generate Report</button>
        <button className="action-btn secondary">View Calendar</button>
      </div>
    </div>
  );
};

export default DoctorPortal;
