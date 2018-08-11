var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;    //if empty string is trimmed, the lenght would be zero
}

module.exports = {isRealString};