/**
 * Created by ndyumin on 15.09.2016.
 */
function extract(arr, obj) {
    return arr.filter(item => Object.keys(obj).every(key => item[key] === obj[key]));
}

function removeItem(arr, item) {
    const result = arr.slice(0);
    const index = result.indexOf(item);
    result.splice(index, 1);
    return result;
}

module.exports = {
    extract,
    removeItem
};