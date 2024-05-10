const { test, describe } = require('node:test') // import the test function for defining tests
const assert = require('node:assert') // import the assert function for assertion

const average = require('../utils/for_testing').average // import the average function


// - It'll check the average function when the input is [1]
// - Since the average of a single number is the number itself, the expected result is 1
// - assert.strictEqual() used to check that the actual output of the average function is equal to the expected output
describe('average', () => {
    test('of one value is the value itself', () => {
        assert.strictEqual(average([1]), 1)
    })
})

// - It'll check the average function when the input is [1, 2, 3, 4, 5, 6]
// - Since the average of 1, 2, 3, 4, 5, 6 is 3.5, the expected result is 3.5
// - assert.strictEqual() used to check that the actual output of the average function is equal to the expected output
test('of many is calculated right', () => {
    console.log(average([1, 2, 3, 4, 5, 6]))
    assert.strictEqual(average([1, 2, 3, 4, 5, 6]), 3.5)
})


// - It'll check the average function when the input is []
// - Since the average of an empty array is 0, the expected result is 0
// - assert.strictEqual() used to check that the actual output of the average function is equal to the expected output
test('of empty array is zero', () => {
    assert.strictEqual(average([]), 0)
})