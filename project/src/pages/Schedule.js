import React, { useEffect } from 'react';

const Schedule = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h2>Schedule an Appointment</h2>
      <iframe
        src="https://calendly.com/singhnotariesdotcom"
        width="100%"
        height="600"
        frameBorder="0"
        style={{ minWidth: '320px' }}
        title="Calendly Scheduling Widget"
      ></iframe>
    </div>
  );
};

export default Schedule;
