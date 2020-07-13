import React from 'react';

const Timer = ({ miliseconds }) => {
    // time conversions
    const convertMiliseconds = ms => {
        const seconds = Math.floor(ms / 1000);
        const minutes = Math.floor(seconds / 60);
        const convertedTime = (`m: ${minutes} | s: ${seconds} | ms: ${ms}`);
        return convertedTime;
    }

    return (
    <div className="timer text-center p-2">
        {convertMiliseconds(miliseconds)}
    </div>
    )
}

export default Timer;