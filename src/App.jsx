import { useState, useEffect } from 'react';
import { format, formatDuration, intervalToDuration, isBefore, addDays } from 'date-fns';
import Confetti from 'react-confetti';

import './App.css'

function App() {
  const [endDate, setEndDate] = useState(new Date("August 23, 2023"));
  const [countdown, setCountdown] = useState('');
  const [countdownEnded, setCountdownEnded] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = intervalToDuration({ start: now, end: endDate });

      if (isBefore(endDate, now)) { 
        setCountdownEnded(true);
        clearInterval(interval);
      } else { 
        setCountdown(`${formatDuration(duration)}`);
      }

    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  const handleDateChange = (event) => {
    // const chosenDate = new Date(event.target.value);
    const chosenDate = new Date(event.target.value + 'T00:00:00');
    const date = new Date(event.target.value);
    // date.setDate(date.getDate() + 1);
    setEndDate(date);
    setCountdownEnded(false);
  };

  return (
    <div className='ctn-timer'>
      {countdownEnded && <Confetti />}
      <img src='https://m.media-amazon.com/images/M/MV5BYzA3ZjQ4YTItNjRhYS00YzRkLTg4NTEtMTYyOGZjNDFmYWM5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' width={`300px`}/> 
      <div className='timer'>
        <h2>Countdown Clock</h2>
        <input type="date" onChange={handleDateChange} />
        {/* <h3>{format(endDate, "MMMM do, yyyy")}</h3> */}
        <h3>{format(addDays(endDate, 1), "MMMM do, yyyy")}</h3>
        {!countdownEnded && <h4>{countdown}</h4>}
        {countdownEnded && <h4>Countdown Ended!</h4>}
      </div>
    </div>
  );    
}

export default App;
