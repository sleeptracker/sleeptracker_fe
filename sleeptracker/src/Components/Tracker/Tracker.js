import React, {useState, useEffect } from 'react';
import Clock from './Clock';
import { makeStyles } from '@material-ui/core';
import moment from 'moment';
const mnt = moment();
const useStyles = makeStyles({
   container: {
       display: 'flex',
       justifyContent: 'center',
       width: '80%',
       height: '1000px',
       margin: '0 auto'
   },
   clock: {
       position: 'absolute',
       top: '60%'
   }
})
let isAmPm = moment.updateLocale('en', {
   meridiemParse : RegExp,
   isPM : function (input) {
       return ((input + '').toLowerCase()[0] === 'p');
   }
});
let meridian = '';
if (isAmPm === true) {
   meridian = 'am'
} else {
   meridian = 'pm'
}
function Tracker(props) {
   const classes = useStyles();
   const [hour, setHour] = useState(mnt.hour());
   const [minute, setMinute] = useState(mnt.minute());
   const [pm, setPm] = useState(true)
   const [hemisphere, setHemisphere] = useState();
   const handleTime = (dir, time) => {
       if (dir === 'up') {
           time === 'hour' ? setHour(mnt.add(1, 'hour').hour()) : time === 'min' ? setMinute(mnt.add(1, 'minute').minute()) : setPm(!pm)
       } else if (dir === 'down') {
           time === 'hour' ? setHour(mnt.subtract(1, 'hour').hour()) : time === 'min' ? setMinute(mnt.subtract(1, 'minute').minute()) : setPm(!pm);
       }
   }
   useEffect(() => {
       pm === true ? setHemisphere('pm') : setHemisphere('am');
       if (mnt.hour() >= 13) {
           setHour(mnt.hour() - 12)
       }
   }, [hour, pm])
   return (
       <div className={classes.container}>
           <div className={classes.clock}>
               <Clock handleTime={handleTime} hour={hour} minute={minute} hemisphere={hemisphere} />
           </div>
       </div>
   )
}
export default Tracker