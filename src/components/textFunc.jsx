export function formatNumber(num) {
    let numStr = parseFloat(num).toFixed(2);
    numStr = numStr.replace(/\.00$/, '');
    return numStr;
}

export function capitalizeAllWords(str) {
    return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function convertString(str) {
    return str.split(/(?=[A-Z])/).map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        .replace(/G|M/, ' $&').replace(/G|Mg/g, match => ` (${match.toLowerCase()})`);
}

export function cutDate(date){
    return date.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
    }).replace(/(\d{2})\/(\d{2})\/(\d{2})/, "$1.$2.$3"); // only date no time
}