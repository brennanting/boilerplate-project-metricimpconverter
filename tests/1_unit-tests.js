const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  // convertHandler should correctly read a whole number input.
  test('Testing valid whole number input', () => {assert.strictEqual(convertHandler.getNum('5'), 5, 'Correctly read whole number input')})
  // convertHandler should correctly read a decimal number input.
  test('Testing valid decimal number input', () => {assert.strictEqual(convertHandler.getNum('0.25'), 0.25, 'Correctly read decimal number input')})
  // convertHandler should correctly read a fractional input.
  test('Testing valid fractional input', () => {assert.strictEqual(convertHandler.getNum('3/2'), 1.5, 'Correctly read fractional input')})
  // convertHandler should correctly read a fractional input with a decimal.
  test('Testing valid fractional input with decimal', () => {assert.strictEqual(convertHandler.getNum('0.66/3'), 0.22, 'Correctly read fractional input with decimal')})
  // convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).
  test('Testing invalid double-fraction input', () => {assert.strictEqual(convertHandler.getNum('3/2/3'), undefined, 'Correctly return error on double-fraction input')})
  // convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.
  test('Testing no numerical input', () => {assert.strictEqual(convertHandler.getNum('km'), 1, 'Correctly return 1 when no numerical input given')})
  // convertHandler should correctly read each valid input unit.
  test('Testing valid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('km'), 'km', 'Correctly return valid input unit')
  })
  // convertHandler should correctly return an error for an invalid input unit.
  test('Testing invalid input unit', () => {
    assert.strictEqual(convertHandler.getUnit('oz'), undefined, 'Correctly return error for invalid input unit')
  })
  // convertHandler should return the correct return unit for each valid input unit.
  test('Testing return unit for valid input unit', () => {
    assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg', 'Correctly return return unit for valid input unit')
  })
  // convertHandler should correctly return the spelled-out string unit for each valid input unit.
  test('Testing spelled out string unit for valid input unit', () => {
    assert.strictEqual(convertHandler.spellOutUnit('lbs'), 'pounds', 'Correctly return spelled-out string unit for valid input unit')
  })
  // convertHandler should correctly convert gal to L.
  // convertHandler should correctly convert L to gal.
  // convertHandler should correctly convert mi to km.
  // convertHandler should correctly convert km to mi.
  // convertHandler should correctly convert lbs to kg.
  // convertHandler should correctly convert kg to lbs.
});