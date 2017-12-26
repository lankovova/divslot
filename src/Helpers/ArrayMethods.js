/**
 * Get next number from given array
 * @param {Array} array Array to get an item from
 * @param {Number} item Current item
 * @returns {Number} Next item
 */
function getNextArrayItem(array, item) {
    const currentIndex = array.indexOf(item);
    const newIndex = (currentIndex === array.length - 1) ? 0 : currentIndex + 1;

    return array[newIndex];
}

export {getNextArrayItem};