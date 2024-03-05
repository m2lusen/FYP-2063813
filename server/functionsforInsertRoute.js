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
            let element = obj[key][i];
            if (element == null) {
                element = "NULL" 
            }
            row.push(element);
        });
        valueRows.push(row);
    }
    return valueRows;
}

// move somewhere with general functions
/**
 * Creates a string representation of an array suitable for database insert values.
 * @param {Array} Arr - The array to convert.
 * @returns {string} - The string representation of the array.
 */
function createDbInsertValuesRow(Arr){
    // return '(' + Arr.map(item => typeof item === 'string' ? `'${item}'` : item).join(', ') + ')';
    return '(' + Arr.map(item => {
        if (typeof item === 'string' && item !== 'NULL') {
            return `'${item}'`;
        } else {
            return item;
        }
    }).join(', ') + ')';
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


// console.log(objArrToDbInsertValues({
//     "game_system_name": ["Wrath of Kings"],
//     "game_system_edition":["1st edition"], 
//     "game_system_version": [null]
// }))

module.exports = objArrToDbInsertValues;