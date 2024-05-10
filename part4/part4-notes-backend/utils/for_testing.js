
// reverse() - it take string as parameter 
//           - return new string that is reverse of the input string
const reverse = (string) => {
    return string
        .split('')
        .reverse('')
        .join('')
}


// average() - it calculate the average of the array of numbers
//           - it first define reducer that takes sum and item as parameter and return sum + item
//           - it return 0 if the array is empty
//           - it return the average of the array if the array is not empty
const average = (array) => {
    const reducer = (sum, item) => {
        return sum + item
    }

    return array.length === 0
        ? 0
        : array.reduce(reducer, 0) / array.length
}

module.exports = {
    reverse,
    average
}