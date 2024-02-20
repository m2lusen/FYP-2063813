/**
 * Converts an object of key-value pairs into a string representation of a set clause for an SQL UPDATE statement.
 * @param {Object} obj - The object containing the key-value pairs.
 * @returns {string} - The string representation of the set clause.
 */
function objArrToDbUpdateSet(obj) {
    const keys = Object.keys(obj);
    let values = [];
    keys.forEach(key => {
        const element = obj[key];
        values.push(typeof element === 'string' ? `'${element}'` : element);
    });

    let res = '';
    for (let i = 0; i < keys.length; i++) {
        res = res + keys[i] + ' = ' + values[i];
        if (i < keys.length - 1) {
            res += ', ';
        }
    }

    return res;
}

module.exports = objArrToDbUpdateSet;