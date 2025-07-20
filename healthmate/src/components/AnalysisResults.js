import React, { useState } from 'react';
import '../styles/AnalysisResults.css';

const AnalysisResults = () => {
  const [analysisData] = useState({
    overallScore: 85,
    riskLevel: 'Low',
    lastAnalysis: '2024-07-10',
    keyFindings: [
      { category: 'Blood Pressure', status: 'Normal', value: '120/80 mmHg', trend: 'stable' },
      { category: 'Cholesterol', status: 'Slightly Elevated', value: '210 mg/dL', trend: 'increasing' },
      { category: 'Blood Sugar', status: 'Normal', value: '95 mg/dL', trend: 'stable' },
      { category: 'BMI', status: 'Normal', value: '23.5', trend: 'decreasing' },
      { category: 'Heart Rate', status: 'Normal', value: '72 bpm', trend: 'stable' }
    ],
    recommendations: [
      {
        priority: 'high',
        title: 'Cholesterol Management',
        description: 'Consider dietary modifications to reduce cholesterol levels',
        action: 'Schedule nutritionist consultation'
      },
      {
        priority: 'medium',
        title: 'Regular Exercise',
        description: 'Maintain current exercise routine for cardiovascular health',
        action: 'Continue 30 minutes daily activity'
      },
      {
        priority: 'low',
        title: 'Preventive Care',
        description: 'Schedule annual check-up to monitor health trends',
        action: 'Book appointment in 6 months'
      }
    ],
    trends: {
      bloodPressure: [118, 120, 122, 120, 120],
      cholesterol: [195, 200, 205, 208, 210],
      weight: [175, 174, 172, 171, 170],
      heartRate: [74, 73, 72, 71, 72]
    }
  });

  const [activeTab, setActiveTab] = useState('overview');

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'normal': return '#2ed573';
      case 'slightly elevated': return '#ffa502';
      case 'elevated': return '#ff4757';
      case 'high': return '#ff3742';
      default: return '#57606f';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing': return '↗️';
      case 'decreasing': return '↘️';
      case 'stable': return '→';
      default: return '→';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#ff4757';
      case 'medium': return '#ffa502';
      case 'low': return '#2ed573';
      default: return '#57606f';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return '#2ed573';
    if (score >= 60) return '#ffa502';
    return '#ff4757';
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'details', label: 'Detailed Results' },
    { id: 'trends', label: 'Trends' },
    { id: 'recommendations', label: 'Recommendations' }
  ];

  return (
    <div className="analysis-results">
      <div className="results-header">
        <h1>Health Analysis Results</h1>
        <p>Last analyzed: {analysisData.lastAnalysis}</p>
      </div>

      <div className="score-section">
        <div className="score-card">
          <div className="score-circle" style={{ borderColor: getScoreColor(analysisData.overallScore) }}>
            <div className="score-number">{analysisData.overallScore}</div>
            <div className="score-label">Health Score</div>
          </div>
          <div className="risk-level">
            <span className="risk-label">Risk Level:</span>
            <span className="risk-value" style={{ color: getScoreColor(analysisData.overallScore) }}>
              {analysisData.riskLevel}
            </span>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-content">
              <div className="findings-grid">
                {analysisData.keyFindings.map((finding, index) => (
                  <div key={index} className="finding-card">
                    <div className="finding-header">
                      <h3>{finding.category}</h3>
                      <span className="trend-icon">{getTrendIcon(finding.trend)}</span>
                    </div>
                    <div className="finding-value">{finding.value}</div>
                    <div 
                      className="finding-status"
                      style={{ color: getStatusColor(finding.status) }}
                    >
                      {finding.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'details' && (
            <div className="details-content">
              <div className="details-table">
                <h2>Detailed Analysis</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Parameter</th>
                      <th>Value</th>
                      <th>Status</th>
                      <th>Normal Range</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {analysisData.keyFindings.map((finding, index) => (
                      <tr key={index}>
                        <td>{finding.category}</td>
                        <td>{finding.value}</td>
                        <td style={{ color: getStatusColor(finding.status) }}>
                          {finding.status}
                        </td>
                        <td>
                          {finding.category === 'Blood Pressure' && '90-120/60-80 mmHg'}
                          {finding.category === 'Cholesterol' && '< 200 mg/dL'}
                          {finding.category === 'Blood Sugar' && '70-100 mg/dL'}
                          {finding.category === 'BMI' && '18.5-24.9'}
                          {finding.category === 'Heart Rate' && '60-100 bpm'}
                        </td>
                        <td>{getTrendIcon(finding.trend)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'trends' && (
            <div className="trends-content">
              <h2>Health Trends</h2>
              <div className="trends-grid">
                <div className="trend-card">
                  <h3>Blood Pressure Trend</h3>
                  <div className="trend-chart">
                    {analysisData.trends.bloodPressure.map((value, index) => (
                      <div key={index} className="trend-bar">
                        <div 
                          className="trend-value"
                          style={{ height: `${(value / 150) * 100}%` }}
                        ></div>
                        <span className="trend-label">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="trend-card">
                  <h3>Cholesterol Trend</h3>
                  <div className="trend-chart">
                    {analysisData.trends.cholesterol.map((value, index) => (
                      <div key={index} className="trend-bar">
                        <div 
                          className="trend-value cholesterol"
                          style={{ height: `${(value / 250) * 100}%` }}
                        ></div>
                        <span className="trend-label">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="trend-card">
                  <h3>Weight Trend</h3>
                  <div className="trend-chart">
                    {analysisData.trends.weight.map((value, index) => (
                      <div key={index} className="trend-bar">
                        <div 
                          className="trend-value weight"
                          style={{ height: `${(value / 200) * 100}%` }}
                        ></div>
                        <span className="trend-label">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="recommendations-content">
              <h2>Personalized Recommendations</h2>
              <div className="recommendations-list">
                {analysisData.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <div className="recommendation-header">
                      <h3>{rec.title}</h3>
                      <span 
                        className="priority-badge"
                        style={{ backgroundColor: getPriorityColor(rec.priority) }}
                      >
                        {rec.priority} priority
                      </span>
                    </div>
                    <p className="recommendation-description">{rec.description}</p>
                    <div className="recommendation-action">
                      <strong>Recommended Action:</strong> {rec.action}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="results-actions">
        <button className="action-btn primary">Download Report</button>
        <button className="action-btn secondary">Share with Doctor</button>
        <button className="action-btn secondary">Schedule Follow-up</button>
      </div>
    </div>
  );
};

export default AnalysisResults;
