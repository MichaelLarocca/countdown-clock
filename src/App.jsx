import { useState, useEffect } from 'react';
import { format, formatDuration, intervalToDuration } from 'date-fns';

import './App.css'

function App() {
  const endDate = new Date("August 23, 2023");
  const [countdown, setCountdown] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeDifference = endDate - now;
      const duration = intervalToDuration({ start: now, end: endDate });

      const formattedTime = format(endDate, "MMMM do, yyyy h:mm a");
      setCountdown(`${formatDuration(duration)} until ${formattedTime}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Countdown Timer</h2>
      <p>{countdown}</p>
    </div>
  );    
}

export default App;
