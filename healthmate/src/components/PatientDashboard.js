import React, { useState } from 'react';
import '../styles/PatientDashboard.css';

const PatientDashboard = () => {
  const [patientData] = useState({
    name: 'John Doe',
    age: 45,
    bloodType: 'O+',
    lastCheckup: '2024-06-15',
    upcomingAppointments: [
      { date: '2024-07-20', time: '10:00 AM', doctor: 'Dr. Smith', type: 'Routine Checkup' },
      { date: '2024-07-25', time: '2:30 PM', doctor: 'Dr. Johnson', type: 'Cardiology' }
    ],
    vitals: {
      bloodPressure: '120/80',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      weight: '170 lbs'
    },
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' }
    ]
  });

  return (
    <div className="patient-dashboard">
      <div className="dashboard-header">
        <h1>Patient Dashboard</h1>
        <p>Welcome back, {patientData.name}</p>
      </div>

      <div className="dashboard-grid">
        <div className="card patient-info">
          <h2>Patient Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <span className="label">Name:</span>
              <span className="value">{patientData.name}</span>
            </div>
            <div className="info-item">
              <span className="label">Age:</span>
              <span className="value">{patientData.age}</span>
            </div>
            <div className="info-item">
              <span className="label">Blood Type:</span>
              <span className="value">{patientData.bloodType}</span>
            </div>
            <div className="info-item">
              <span className="label">Last Checkup:</span>
              <span className="value">{patientData.lastCheckup}</span>
            </div>
          </div>
        </div>

        <div className="card vitals">
          <h2>Current Vitals</h2>
          <div className="vitals-grid">
            <div className="vital-item">
              <span className="vital-label">Blood Pressure</span>
              <span className="vital-value">{patientData.vitals.bloodPressure}</span>
            </div>
            <div className="vital-item">
              <span className="vital-label">Heart Rate</span>
              <span className="vital-value">{patientData.vitals.heartRate}</span>
            </div>
            <div className="vital-item">
              <span className="vital-label">Temperature</span>
              <span className="vital-value">{patientData.vitals.temperature}</span>
            </div>
            <div className="vital-item">
              <span className="vital-label">Weight</span>
              <span className="vital-value">{patientData.vitals.weight}</span>
            </div>
          </div>
        </div>

        <div className="card appointments">
          <h2>Upcoming Appointments</h2>
          <div className="appointments-list">
            {patientData.upcomingAppointments.map((appointment, index) => (
              <div key={index} className="appointment-item">
                <div className="appointment-date">{appointment.date}</div>
                <div className="appointment-time">{appointment.time}</div>
                <div className="appointment-doctor">{appointment.doctor}</div>
                <div className="appointment-type">{appointment.type}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="card medications">
          <h2>Current Medications</h2>
          <div className="medications-list">
            {patientData.medications.map((medication, index) => (
              <div key={index} className="medication-item">
                <div className="medication-name">{medication.name}</div>
                <div className="medication-details">
                  <span className="dosage">{medication.dosage}</span>
                  <span className="frequency">{medication.frequency}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-actions">
        <button className="action-btn primary">Schedule Appointment</button>
        <button className="action-btn secondary">View Medical Records</button>
        <button className="action-btn secondary">Update Profile</button>
      </div>
    </div>
  );
};

export default PatientDashboard;
