'use strict'

function generate(testLengthArray){
  // return Array.from({length : testLengthArray.length})
  //   .map(item => ({
  //     input: Array.from({length: item}).map(item => []),
  //     target: 0,
  //     output: -1
  //   })
  // ); // Remove this line and change to your own algorithm
  var newArray = [];
  for (var i = 0; i< testLengthArray.length; i++) {
    var secondaryArray = arrayGen(testLengthArray[i]);
    newArray.push(secondaryArray);
  }
  return newArray;
}

var arrayNew = [6, 7, 8];

console.log(generate(arrayNew));

module.exports = generate

function arrayGen(number) {
  var numberArray = [];

  for(var i = 0; i< number; i++) {
    var numberGen = 1000 - Math.floor(Math.random() * 2000);
    numberArray.push(numberGen);
  }

  numberArray.sort((a,b) => a-b);

  var result;
  var output;

  var randomize = Math.floor(Math.random() * 4) + 1;
  if (randomize == 1) output = -1;
  else if (randomize == 2) output = 0;
  else if (randomize == 3) output = numberArray.length - 1;
  else if (randomize == 4) output = Math.floor(Math.random() * numberArray.length);

  if (output == -1) {
    result = 2000;
  } else result = numberArray[output];

  return {
    "input": numberArray,
    "target": result,
    "output": output
  }
}

module.exports = generate
