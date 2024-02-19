/**
 * Unpacks an object of arrays into an array of arrays.
 * @param {Object} obj - The object to unpack.
 * @returns {Array<Array>} - The unpacked array of arrays.
 */
function unpackObjArray(obj){
    const keys = Object.keys(obj);
    let valueRows = [];
    const maxLength = Math.max(...keys.map(key => obj[key].length));
    
    for (let i = 0; i < maxLength; i++) {
        let row = [];
        keys.forEach(key => {
            const element = obj[key][i];
            row.push(element);
        });
        valueRows.push(row);
    }
    return valueRows;
}

/**
 * Creates a string representation of an array suitable for database insert values.
 * @param {Array} Arr - The array to convert.
 * @returns {string} - The string representation of the array.
 */
function createDbInsertValuesRow(Arr){
    return '(' + Arr.map(item => typeof item === 'string' ? `'${item}'` : item).join(', ') + ')';
}

/**
 * Converts an object of arrays into a string representation of database insert values.
 * @param {Object} obj - The object to convert.
 * @returns {string} - The string representation of the database insert values.
 */
function objArrToDbInsertValues(obj) {
    const Arr = unpackObjArray(obj);
    let res = '';
    for (let i = 0; i < Arr.length; i++) {
        res = res + createDbInsertValuesRow(Arr[i]);
        if (i < Arr.length - 1) {
            res += ',';
        }
    }
    return res;
}

module.exports = objArrToDbInsertValues;