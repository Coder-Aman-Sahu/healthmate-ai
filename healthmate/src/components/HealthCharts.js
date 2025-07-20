import React, { useState } from 'react';
import '../styles/HealthCharts.css';

const HealthCharts = () => {
  const [chartData] = useState({
    bloodPressure: {
      systolic: [120, 118, 122, 125, 120, 118, 121],
      diastolic: [80, 78, 82, 85, 80, 78, 81],
      dates: ['Jul 1', 'Jul 2', 'Jul 3', 'Jul 4', 'Jul 5', 'Jul 6', 'Jul 7']
    },
    heartRate: [72, 74, 70, 68, 72, 75, 73],
    weight: [170, 169.5, 169, 169.2, 168.8, 168.5, 168.2],
    glucose: [95, 92, 98, 94, 96, 93, 95],
    cholesterol: {
      total: [210, 208, 205, 203, 200, 198, 195],
      ldl: [130, 128, 125, 123, 120, 118, 115],
      hdl: [45, 46, 47, 48, 49, 50, 51]
    }
  });

  const [selectedChart, setSelectedChart] = useState('bloodPressure');
  const [timeRange, setTimeRange] = useState('7days');

  const chartOptions = [
    { id: 'bloodPressure', label: 'Blood Pressure', icon: '🩸' },
    { id: 'heartRate', label: 'Heart Rate', icon: '💓' },
    { id: 'weight', label: 'Weight', icon: '⚖️' },
    { id: 'glucose', label: 'Blood Glucose', icon: '🩸' },
    { id: 'cholesterol', label: 'Cholesterol', icon: '🧪' }
  ];

  const timeRanges = [
    { id: '7days', label: '7 Days' },
    { id: '1month', label: '1 Month' },
    { id: '3months', label: '3 Months' },
    { id: '6months', label: '6 Months' },
    { id: '1year', label: '1 Year' }
  ];

  const getChartColor = (type) => {
    switch (type) {
      case 'systolic': return '#ff4757';
      case 'diastolic': return '#3742fa';
      case 'heartRate': return '#ff6b6b';
      case 'weight': return '#4ecdc4';
      case 'glucose': return '#45b7d1';
      case 'total': return '#96ceb4';
      case 'ldl': return '#ffeaa7';
      case 'hdl': return '#74b9ff';
      default: return '#57606f';
    }
  };

  const renderChart = (data, type) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue;
    
    return (
      <div className="chart-container">
        <div className="chart-grid">
          {data.map((value, index) => (
            <div key={index} className="chart-column">
              <div 
                className="chart-bar"
                style={{ 
                  height: `${((value - minValue) / range) * 100}%`,
                  backgroundColor: getChartColor(type)
                }}
              >
                <span className="chart-value">{value}</span>
              </div>
              <span className="chart-label">
                {chartData.bloodPressure.dates[index]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderBloodPressureChart = () => {
    return (
      <div className="bp-chart-container">
        <div className="bp-chart-grid">
          {chartData.bloodPressure.systolic.map((systolic, index) => {
            const diastolic = chartData.bloodPressure.diastolic[index];
            return (
              <div key={index} className="bp-chart-column">
                <div className="bp-values">
                  <div 
                    className="bp-bar systolic"
                    style={{ height: `${(systolic / 150) * 100}%` }}
                  >
                    <span className="bp-value">{systolic}</span>
                  </div>
                  <div 
                    className="bp-bar diastolic"
                    style={{ height: `${(diastolic / 100) * 100}%` }}
                  >
                    <span className="bp-value">{diastolic}</span>
                  </div>
                </div>
                <span className="bp-label">
                  {chartData.bloodPressure.dates[index]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="bp-legend">
          <div className="legend-item">
            <div className="legend-color systolic"></div>
            <span>Systolic</span>
          </div>
          <div className="legend-item">
            <div className="legend-color diastolic"></div>
            <span>Diastolic</span>
          </div>
        </div>
      </div>
    );
  };

  const renderCholesterolChart = () => {
    return (
      <div className="cholesterol-chart-container">
        <div className="cholesterol-chart-grid">
          {chartData.cholesterol.total.map((total, index) => {
            const ldl = chartData.cholesterol.ldl[index];
            const hdl = chartData.cholesterol.hdl[index];
            return (
              <div key={index} className="cholesterol-chart-column">
                <div className="cholesterol-values">
                  <div 
                    className="cholesterol-bar total"
                    style={{ height: `${(total / 250) * 100}%` }}
                  >
                    <span className="cholesterol-value">{total}</span>
                  </div>
                  <div 
                    className="cholesterol-bar ldl"
                    style={{ height: `${(ldl / 200) * 100}%` }}
                  >
                    <span className="cholesterol-value">{ldl}</span>
                  </div>
                  <div 
                    className="cholesterol-bar hdl"
                    style={{ height: `${(hdl / 80) * 100}%` }}
                  >
                    <span className="cholesterol-value">{hdl}</span>
                  </div>
                </div>
                <span className="cholesterol-label">
                  {chartData.bloodPressure.dates[index]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="cholesterol-legend">
          <div className="legend-item">
            <div className="legend-color total"></div>
            <span>Total</span>
          </div>
          <div className="legend-item">
            <div className="legend-color ldl"></div>
            <span>LDL</span>
          </div>
          <div className="legend-item">
            <div className="legend-color hdl"></div>
            <span>HDL</span>
          </div>
        </div>
      </div>
    );
  };

  const getHealthStatus = (type, value) => {
    switch (type) {
      case 'bloodPressure':
        if (value <= 120) return { status: 'Normal', color: '#2ed573' };
        if (value <= 139) return { status: 'Elevated', color: '#ffa502' };
        return { status: 'High', color: '#ff4757' };
      case 'heartRate':
        if (value >= 60 && value <= 100) return { status: 'Normal', color: '#2ed573' };
        return { status: 'Monitor', color: '#ffa502' };
      case 'weight':
        return { status: 'Normal', color: '#2ed573' };
      case 'glucose':
        if (value < 100) return { status: 'Normal', color: '#2ed573' };
        if (value < 126) return { status: 'Prediabetic', color: '#ffa502' };
        return { status: 'Diabetic', color: '#ff4757' };
      default:
        return { status: 'Normal', color: '#2ed573' };
    }
  };

  const getCurrentValue = (type) => {
    switch (type) {
      case 'bloodPressure':
        return chartData.bloodPressure.systolic[chartData.bloodPressure.systolic.length - 1];
      case 'heartRate':
        return chartData.heartRate[chartData.heartRate.length - 1];
      case 'weight':
        return chartData.weight[chartData.weight.length - 1];
      case 'glucose':
        return chartData.glucose[chartData.glucose.length - 1];
      default:
        return 0;
    }
  };

  return (
    <div className="health-charts">
      <div className="charts-header">
        <h1>Health Charts</h1>
        <p>Track your health metrics over time</p>
      </div>

      <div className="charts-controls">
        <div className="chart-selector">
          {chartOptions.map(option => (
            <button
              key={option.id}
              className={`chart-option ${selectedChart === option.id ? 'active' : ''}`}
              onClick={() => setSelectedChart(option.id)}
            >
              <span className="chart-icon">{option.icon}</span>
              {option.label}
            </button>
          ))}
        </div>

        <div className="time-range-selector">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="time-range-select"
          >
            {timeRanges.map(range => (
              <option key={range.id} value={range.id}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="chart-display">
        <div className="chart-info">
          <h2>
            {chartOptions.find(opt => opt.id === selectedChart)?.label}
            {chartOptions.find(opt => opt.id === selectedChart)?.icon}
          </h2>
          {selectedChart !== 'bloodPressure' && selectedChart !== 'cholesterol' && (
            <div className="current-value">
              <span className="value">{getCurrentValue(selectedChart)}</span>
              <span 
                className="status"
                style={{ color: getHealthStatus(selectedChart, getCurrentValue(selectedChart)).color }}
              >
                {getHealthStatus(selectedChart, getCurrentValue(selectedChart)).status}
              </span>
            </div>
          )}
        </div>

        <div className="chart-area">
          {selectedChart === 'bloodPressure' && renderBloodPressureChart()}
          {selectedChart === 'cholesterol' && renderCholesterolChart()}
          {selectedChart === 'heartRate' && renderChart(chartData.heartRate, 'heartRate')}
          {selectedChart === 'weight' && renderChart(chartData.weight, 'weight')}
          {selectedChart === 'glucose' && renderChart(chartData.glucose, 'glucose')}
        </div>
      </div>

      <div className="chart-insights">
        <h3>Insights</h3>
        <div className="insights-grid">
          <div className="insight-card">
            <h4>Trending Up</h4>
            <p>Your weight has been steadily decreasing over the past week</p>
          </div>
          <div className="insight-card">
            <h4>Stable Range</h4>
            <p>Blood pressure remains in normal range</p>
          </div>
          <div className="insight-card">
            <h4>Recommendation</h4>
            <p>Continue monitoring cholesterol levels</p>
          </div>
        </div>
      </div>

      <div className="charts-actions">
        <button className="action-btn primary">Export Data</button>
        <button className="action-btn secondary">Share Report</button>
        <button className="action-btn secondary">Set Goals</button>
      </div>
    </div>
  );
};

export default HealthCharts;
