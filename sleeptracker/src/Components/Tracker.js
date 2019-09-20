import React, {useState, useEffect } from 'react';
import Clock from './Tracker-Components/Clock';

function Tracker(props) {

    const [hour, setHour] = useState(10);
    const [minute, setMinute] = useState(22);

    return (
        <div>
            <Clock hour={hour} minute={minute} />
        </div>
    )
}

export default Tracker