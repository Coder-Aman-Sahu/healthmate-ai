import React, { useState } from 'react';
import '../styles/DocumentUpload.css';

const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState([
    { id: 1, name: 'Blood_Test_Results.pdf', type: 'Lab Report', date: '2024-07-10', size: '2.1 MB', status: 'processed' },
    { id: 2, name: 'X-Ray_Chest.jpg', type: 'Imaging', date: '2024-07-08', size: '5.3 MB', status: 'processing' },
    { id: 3, name: 'Medical_History.pdf', type: 'Medical Record', date: '2024-07-05', size: '1.8 MB', status: 'processed' }
  ]);

  const [dragOver, setDragOver] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const documentCategories = [
    'Lab Reports',
    'Imaging',
    'Medical Records',
    'Prescriptions',
    'Insurance Documents',
    'Discharge Summary',
    'Other'
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFileUpload(files);
  };

  const handleFileUpload = (files) => {
    files.forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        type: selectedCategory || 'Uncategorized',
        date: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'uploading'
      };
      
      setUploadedFiles(prev => [...prev, newFile]);
      
      // Simulate upload process
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: 'processing' }
              : f
          )
        );
      }, 1000);
      
      setTimeout(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === newFile.id 
              ? { ...f, status: 'processed' }
              : f
          )
        );
      }, 3000);
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return '#2ed573';
      case 'processing': return '#ffa502';
      case 'uploading': return '#3742fa';
      case 'error': return '#ff4757';
      default: return '#57606f';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'processed': return '✓';
      case 'processing': return '⟳';
      case 'uploading': return '↑';
      case 'error': return '!';
      default: return '•';
    }
  };

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id));
  };

  return (
    <div className="document-upload">
      <div className="upload-header">
        <h1>Document Upload</h1>
        <p>Upload and manage your medical documents</p>
      </div>

      <div className="upload-section">
        <div className="category-selector">
          <label htmlFor="category">Document Category:</label>
          <select 
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">Select Category</option>
            {documentCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div 
          className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">📄</div>
          <h3>Drag & Drop Files Here</h3>
          <p>or click to select files</p>
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
            onChange={handleFileSelect}
            className="file-input"
          />
          <div className="file-types">
            Supported formats: PDF, JPG, PNG, DOC, DOCX
          </div>
        </div>
      </div>

      <div className="files-section">
        <div className="files-header">
          <h2>Uploaded Documents</h2>
          <div className="files-count">{uploadedFiles.length} files</div>
        </div>

        <div className="files-grid">
          {uploadedFiles.map(file => (
            <div key={file.id} className="file-card">
              <div className="file-header">
                <div className="file-icon">📄</div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFile(file.id)}
                >
                  ×
                </button>
              </div>
              
              <div className="file-info">
                <div className="file-name">{file.name}</div>
                <div className="file-details">
                  <span className="file-type">{file.type}</span>
                  <span className="file-size">{file.size}</span>
                </div>
                <div className="file-date">{file.date}</div>
              </div>
              
              <div className="file-status">
                <span 
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(file.status) }}
                >
                  <span className="status-icon">{getStatusIcon(file.status)}</span>
                  {file.status}
                </span>
              </div>
              
              {file.status === 'processed' && (
                <div className="file-actions">
                  <button className="action-btn small">View</button>
                  <button className="action-btn small">Download</button>
                  <button className="action-btn small">Share</button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="upload-guidelines">
        <h3>Upload Guidelines</h3>
        <ul>
          <li>Maximum file size: 10MB</li>
          <li>Supported formats: PDF, JPG, PNG, DOC, DOCX</li>
          <li>Please ensure documents are clear and readable</li>
          <li>Personal information will be kept secure and confidential</li>
          <li>Processing time varies based on document type</li>
        </ul>
      </div>
    </div>
  );
};

export default DocumentUpload;
