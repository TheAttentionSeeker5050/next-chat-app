

// using the default date library   
export const formatDate = (date: Date): string => {
  // if the datetime is invalid, return an empty string
    if (isNaN(date.getTime())) {
        return '';
    } 
    // if the datetime is less than 2 minutes ago, return # seconds ago
    else if (date.getTime() > Date.now() - 1000*2*60) {
        return `${Math.floor((Date.now() - date.getTime()) / 1000)} seconds ago`;
    }
    // if the datetime is less than 1 hour ago, return # minutes ago
    else if (date.getTime() > Date.now() - 60*60*1000) {
        return `${Math.floor((Date.now() - date.getTime()) / (60*1000))} minutes ago`;
    }
    // if the datetime is today, return only the time in format HH:MM
    else if (date.toDateString() === new Date().toDateString()) {
        return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
    }
    // if the datetime is this year, return the date in format MM/DD
    else if (date.getFullYear() === new Date().getFullYear()) {
        return date.toLocaleDateString([], {month: '2-digit', day: '2-digit'});
    }
    // otherwise, return the date in format MM/DD/YYYY
    else {
        return date.toLocaleDateString();
    }

};