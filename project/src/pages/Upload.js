import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Upload() {
    const Navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    try {
        const response = await axios.post("/upload", {
            title: title,
            file: file,
        });

        if (response.data.message === 'Notary document submitted successfully') {
            // Handle successful submission
            // For example, navigate to a different page or show a success message
            Navigate('/dashboard');
        }
    } catch (error) {
        // Handle error
        setError(error.response.data.message || "Failed to submit the form. Please check your inputs.");
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
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="file">Select File:</label>
          <input
            type="file"
            id="file"
            onChange={(event) => setFile(event.target.files[0])}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      <p>{message}</p>
    </div>
    </section>
  );
};

export default Upload;
