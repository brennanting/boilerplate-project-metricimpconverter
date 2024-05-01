const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const units = [
  {
    symbol: 'gal', 
    name: 'gallons',
    returnSymbol: 'L',
    convFactor: galToL
  },
  {
    symbol: 'L',
    name: 'liters',
    returnSymbol: 'gal',
    convFactor: 1/galToL
  },
  {
    symbol: 'lbs',
    name: 'pounds',
    returnSymbol: 'kg',
    convFactor: lbsToKg
  },
  {
    symbol: 'kg',
    name: 'kilograms',
    returnSymbol: 'lbs',
    convFactor: 1/lbsToKg
  },
  {
    symbol: 'mi',
    name: 'miles',
    returnSymbol: 'km',
    convFactor: miToKm
  },
  {
    symbol: 'km',
    name: 'kilometers',
    returnSymbol: 'mi',
    convFactor: 1/miToKm
  }
]

function ConvertHandler() {
  this.getNum = function (input) {
    let qtyString;
    let regex = /[a-zA-Z]/;
    // finds the first time a letter appears in the input
    index = input.search(regex)

    // if first character is a letter
    if (index == 0) {
      // set quantity to default of 1
      qtyString = '1';

    // otherwise if there is a non-letter character before the first letter
    } else if (index > 0 ) {
      // set quantity to the string before the first letter
      qtyString = input.slice(0, index);

    // if index is less than 0 ie letter not found in the input
    } else {
      // the whole input is the quantity
      qtyString = input
    }

    let slashIndex = qtyString.search('/')

    // if there is a slash in the input
    if (slashIndex > 0) {
      let numerator = qtyString.slice(0, slashIndex);
      let denominator = qtyString.slice(slashIndex + 1, qtyString.length);
      if (isNaN(numerator) || isNaN(denominator) || !numerator || ! denominator || denominator == 0) {
        return;
      } else {
        let divResult = numerator / denominator;
        return divResult;
      }
    // if no slash in input
    } else {
      //if NaN or empty
      if (!qtyString || isNaN(qtyString)) {
        // return invalid number
        return;
        
      // else
      } else {
        // return the result
        return Number(qtyString);
      }
    }
  };

  this.getUnit = function (input) {
    let unitString;
    let regex = /[a-zA-Z]/;
    index = input.search(regex);
    if (index < 0) {
      return;
    }
    unitString = input.slice(index, input.length);
    return this.spellOutUnit(unitString);
  };

  this.getReturnUnit = function (initUnit) {
    let index = units.findIndex(unit => unit.symbol == initUnit);
    let returnUnit = units[index].returnSymbol;
    return returnUnit;
  };

  this.spellOutUnit = function (unit) {
    let index = units.findIndex(listedunit => 
        unit.toLowerCase() == listedunit.symbol.toLowerCase()
      );
    if (index == -1) {
      return;
    } else {
      return units[index].symbol;
    }
  };

  this.convert = function (initNum, initUnit) {
    
    let index = units.findIndex(unit => unit.symbol == initUnit);
    let result = initNum * units[index].convFactor;
    let roundedResult = Math.round(result * 100000)/100000
    return roundedResult;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = initNum + ' ' + initUnit + ' converts to ' + returnNum + ' ' + returnUnit;
    return result;
  };
}

module.exports = ConvertHandler;
