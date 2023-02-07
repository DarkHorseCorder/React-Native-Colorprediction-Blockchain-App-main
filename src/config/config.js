import axios from 'axios';
const SERVER_URL = "https://meta-club.in";
// const SERVER_URL = "http://10.0.2.2:8000";


export const setAuthToken = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
}

export const displayNumber = (number) => {
    if (number >= 1000000) return (number / 1000000).toFixed(2)+" M";
    if (number >= 1000) return (number / 1000).toFixed(2)+" K";
    return number.toFixed(2);
}

export const displayMemberId = id => {
    const str = "" + id;
    const pad = "000000";
    return pad.substring(0, pad.length - str.length) + str;
}

export default SERVER_URL;