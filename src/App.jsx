import { useState, useEffect } from 'react';
import { format, formatDuration, intervalToDuration, isBefore, addDays, add } from 'date-fns';
import Confetti from 'react-confetti';
import './App.css'

function App() {
  const [countdown, setCountdown] = useState('');
  const [countdownEnded, setCountdownEnded] = useState(false);
  const [endDate, setEndDate] = useState(() => {
    const initialEndDate = localStorage.getItem("endDate");
    return initialEndDate ? new Date(Date.parse(initialEndDate)) : addDays(new Date(), 1);
  });

  function handleDateChange(event) {
    const chosenDate = new Date(event.target.value);
    const dateEST = add(chosenDate, { hours: 4 });
    localStorage.setItem("endDate", dateEST);
    setEndDate(dateEST);
    setCountdownEnded(false);
  };
  // useEffect hook: Updates the countdown every second and checks if the countdown has ended. If it has, it clears the interval and sets the countdownEnded state to true.
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

  return (
    <div className='countdown-timer-container'>
      {countdownEnded && <Confetti />}
      <img src='https://m.media-amazon.com/images/M/MV5BYzA3ZjQ4YTItNjRhYS00YzRkLTg4NTEtMTYyOGZjNDFmYWM5XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg' width={`250`} alt="Countdown clock illustration" /> 
      <div className='timer'>
        <h2>Countdown Clock</h2>
        <input type="date" min={format(new Date(), "yyyy-MM-dd")} onChange={handleDateChange} />
        <h3>{format(endDate, "MMMM do, yyyy")}</h3>
        {!countdownEnded && <h4>{countdown}</h4>}
        {countdownEnded && <h4>Countdown Ended!</h4>}
      </div>
    </div>
  );    
}

export default App;