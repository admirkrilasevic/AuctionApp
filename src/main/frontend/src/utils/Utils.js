import { TimeInterval } from 'time-interval-js';
import { TIME_LEFT } from '../constants';

export const calculateTimeLeft = (endDate) => {
    const date1 = new Date(endDate);
    const date2 = new Date();
    if (date2 > date1) {
        return TIME_LEFT.ENDED;
    }
    const interval = TimeInterval.fromTimeBetweenTwoDates(date1, date2);
    const hours = interval.inHours();
    if (hours < 24) {
        return Math.round(hours) + " hours";
    } else if (hours >= 24 && hours < 168) {
        return Math.floor(hours/24) + " days " + Math.round(hours%24) + " hours" ;
    } else {
        return Math.floor(hours/168) + " weeks " + Math.round((hours%168)/24) + " days";
    }
};
