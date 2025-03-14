"use client"
import React, { useEffect, useState } from "react";

type CountdownProps = {
  seconds: number;
};

const Countdown: React.FC<CountdownProps> = ({ seconds }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="fixed top-3 left-3 p-4 bg-transparent text-white text-3xl">
      <h2>Temps restant :</h2>
      <p className="text-5xl">{timeLeft > 0 ? formatTime(timeLeft) : window.location.href ="/minigames/maze/fail"}</p>
    </div>
  );
};

export default Countdown;
