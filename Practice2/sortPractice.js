'use strict'

var swap = function(a, b) {
  var temp = a;
  a = b;
  b = temp;
};

function sort(input) {
  // return input.sort((a,b) => a-b); // Remove this line and change to your own algorithm
  for (var i = 0; i < input.length; i++) {
    for (var y = 0; y < (input. length - 1 - i); y++) {
      if (input[y] > input[y+1]) {
        // var temp = input[y];
        // input[y] = input[y+1];
        // input[y+1] = temp;
        swap(input[y], input[y+1]);
      }
    }
  }
  return input;
}

// var swap = function(a, b) {
//   var temp = a;
//   a = b;
//   b = temp;
// };


module.exports = sort
