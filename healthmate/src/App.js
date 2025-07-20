import React, { useState } from 'react';
import './App.css';
import PatientDashboard from './components/PatientDashboard';
import DoctorPortal from './components/DoctorPortal';
import DocumentUpload from './components/DocumentUpload';
import AnalysisResults from './components/AnalysisResults';
import HealthCharts from './components/HealthCharts';
import AppointmentScheduler from './components/AppointmentScheduler';
import NotificationCenter from './components/NotificationCenter';

function App() {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const navigationItems = [
    { id: 'dashboard', label: 'Patient Dashboard', icon: '🏠' },
    { id: 'doctor', label: 'Doctor Portal', icon: '👨‍⚕️' },
    { id: 'documents', label: 'Document Upload', icon: '📄' },
    { id: 'analysis', label: 'Analysis Results', icon: '📊' },
    { id: 'charts', label: 'Health Charts', icon: '📈' },
    { id: 'appointments', label: 'Appointments', icon: '📅' },
    { id: 'notifications', label: 'Notifications', icon: '🔔' }
  ];

  const renderComponent = () => {
    switch (activeComponent) {
      case 'dashboard':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorPortal />;
      case 'documents':
        return <DocumentUpload />;
      case 'analysis':
        return <AnalysisResults />;
      case 'charts':
        return <HealthCharts />;
      case 'appointments':
        return <AppointmentScheduler />;
      case 'notifications':
        return <NotificationCenter />;
      default:
        return <PatientDashboard />;
    }
  };

  return (
    <div className="app">
      <nav className="app-nav">
        <div className="nav-header">
          <h1>HealthMate.ai</h1>
          <p>Your Health, Simplified</p>
        </div>
        <div className="nav-items">
          {navigationItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeComponent === item.id ? 'active' : ''}`}
              onClick={() => setActiveComponent(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
      
      <main className="app-main">
        {renderComponent()}
      </main>
    </div>
  );
}

export default App;
