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

      // const formattedTime = format(endDate, "MMMM do, yyyy h:mm a");
      // setCountdown(`${formatDuration(duration)} until ${formattedTime}`);
      setCountdown(`${formatDuration(duration)}`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='ctn-timer'>
      <img src='https://m.media-amazon.com/images/M/MV5BYzA3ZjQ4YTItNjRhYS00YzRkLTg4NTEtMTYyOGZjNDFmYWM5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' width={`300px`}/> 
      <div className='timer'>
        <h2>Countdown Timer</h2>
        <h3>{format(endDate, "MMMM do, yyyy")}</h3>
        <h4>{countdown}</h4>
      </div>
    </div>
  );    
}

export default App;
