export function getFullDate() {
    let date = new Date();
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
}

export function getClockTime() {
    let date = new Date();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    let half = (hour < 12) ? "AM" : "PM";
    hour = hour % 12;
    return hour + ":" + minutes.toPrecision(2) + " " + half;
}