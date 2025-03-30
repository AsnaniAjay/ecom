// src/components/deals/DealTimer.jsx
import React, { useState, useEffect } from 'react';

const DealTimer = ({ endTime }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = endTime - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <div key={interval} className="flex flex-col items-center mx-1">
        <div className="bg-gray-900 text-white rounded-md w-12 h-12 flex items-center justify-center text-xl font-bold">
          {timeLeft[interval].toString().padStart(2, '0')}
        </div>
        <span className="text-xs text-gray-500 mt-1">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex items-center">
      {timerComponents.length ? (
        <>
          <span className="text-gray-900 font-medium mr-2">Ends in:</span>
          <div className="flex">
            {timerComponents}
          </div>
        </>
      ) : (
        <span className="text-red-600 font-medium">Deal has ended!</span>
      )}
    </div>
  );
};

export default DealTimer;