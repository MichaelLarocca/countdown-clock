import { useState, useEffect } from 'react';
import { format, formatDuration, intervalToDuration, isBefore, addDays, add } from 'date-fns';
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
    const chosenDate = new Date(event.target.value);
    const date = new Date(event.target.value);
    const dateEST = add(date, { hours: 3 })
    setEndDate(dateEST);
    setCountdownEnded(false);
  };

  return (
    <div className='ctn-timer'>
      {countdownEnded && <Confetti />}
      <img src='https://m.media-amazon.com/images/M/MV5BYzA3ZjQ4YTItNjRhYS00YzRkLTg4NTEtMTYyOGZjNDFmYWM5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' width={`300px`}/> 
      <div className='timer'>
        <h2>Countdown Clock</h2>
        <input type="date" onChange={handleDateChange} />
        <h3>{format(addDays(endDate, 1), "MMMM do, yyyy")}</h3>
        {!countdownEnded && <h4>{countdown}</h4>}
        {countdownEnded && <h4>Countdown Ended!</h4>}
      </div>
    </div>
  );    
}

export default App;
