import React from 'react';

function CalculateTime({ createdAt }) {
    function calculateTimeDifference(createdAt) {
        const now = new Date();
        const createdDate = new Date(createdAt);
        const timeDifference = now - createdDate;

        const minuteInMs = 60 * 1000;
        const hourInMs = 60 * minuteInMs;
        const dayInMs = 24 * hourInMs;
        const weekInMs = 7 * dayInMs;
        const yearInMs = 365 * dayInMs;

        if (timeDifference < minuteInMs) {
            const seconds = Math.floor(timeDifference / 1000);
            return `just now`;
        } else if (timeDifference < hourInMs) {
            const minutes = Math.floor(timeDifference / minuteInMs);
            return `${minutes} minutes ago`;
        } else if (timeDifference < dayInMs) {
            const hours = Math.floor(timeDifference / hourInMs);
            return `${hours} hours ago`;
        } else if (timeDifference < weekInMs) {
            const days = Math.floor(timeDifference / dayInMs);
            return `${days} days ago`;
        } else if (timeDifference < yearInMs) {
            const weeks = Math.floor(timeDifference / weekInMs);
            return `${weeks} weeks ago`;
        } else {
            const years = Math.floor(timeDifference / yearInMs);
            return `${years} years ago`;
        }
    }

    const timeDifferenceText = calculateTimeDifference(createdAt);

    return (

        <span>{timeDifferenceText}</span>

    );
}

export default CalculateTime;
