//! Unit Testing
// - These are used to test individual units of code, such as functions
// - They are typically small, quick to write, and run quickly


const { test } = require('node:test') // import the test function for defining tests
const assert = require('node:assert') // import the assert function for assertion

const reverse = require('../utils/for_testing').reverse 

// - It'll check the reverse function when the input is 'a'
// - Since the reverse of a single character is the same character, the expected result is 'a'
// - assert.strictEqual() used to check that the actual output of the reverse function is equal to the expected output
test('reverse of a', () => {
    const result = reverse('a')

    assert.strictEqual(result, 'a')
})



// - It'll check the reverse function when the input is 'react'
// - Since the reverse of 'react' is 'tcaer', the expected result is 'tcaer'
// - assert.strictEqual() used to check that the actual output of the reverse function is equal to the expected output

test('reverse of react', () => {
    const result = reverse('react')
  
    assert.strictEqual(result, 'tcaer')
})

// - It'll check the reverse function when the input is 'saippuakauppias'
// - Since the reverse of 'saippuakauppias' is 'saippuakauppias', the expected result is 'saippuakauppias'
// - assert.strictEqual() used to check that the actual output of the reverse function is equal to the expected output
test('reverse of saippuakauppias', () => {
    const result = reverse('saippuakauppias')
  
    assert.strictEqual(result, 'saippuakauppias')
})