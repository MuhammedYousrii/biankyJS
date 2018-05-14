export function processMessage(serviceToExc, message) {
    if (process.env.NODE_ENV === 'production') {
        return false;
    } 
    return console[serviceToExc](message);      
}