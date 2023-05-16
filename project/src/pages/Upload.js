import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !file) {
      setMessage('Please provide a title and select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await axios.post('/upload', formData);
      setMessage('File uploaded successfully');
      setTitle('');
      setFile(null);
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <section id="main" className="container medium">
        <header>
            <h2>E-Notary</h2>
            <p>Upload your document here</p>
        </header>

    <div className='box'>
      <h2>Upload Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        <div>
          <label htmlFor="file">Select File:</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
    </section>
  );
};

export default UploadForm;
