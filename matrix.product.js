// NOTE: Implement Memoization 
(function(w){

  function checkVariableType(v, t){
    return Object.prototype.toString.call(v) === '[object ' + t + ']';
  }

  function checkEquals(x, y){
    return x === y;
  }

  function colVectorToRowVector(cv){

    var result = [];

    cv.forEach(function(rc){
      result.push(rc[0]);
    });

    return result;
  }

  function getVectorSize(v){  

    var vZero = v[0],
        firstElement = vZero[0],
        result = [];
    
    result.push(v.length);

    result = [v.length, vZero.length];

    // firstElement would be a number or an array
    // if is an array... is a column vector
    // otherwise... is a row vector/matrix
    if (checkVariableType(firstElement, 'Array')){
      result.reverse();
    }

    return result;
  }

  function getProductSize(a, b){

    var aSize = getVectorSize(a),
        bSize = getVectorSize(b);

    return aSize[0] * bSize[1];
  }

  function canBeMultiplicated(a, b){
  
    var aSize = getVectorSize(a),
        bSize = getVectorSize(b);

    return checkEquals(aSize[1], bSize[0]);
  }

  function dotProduct(va, vb){

    var vaLen = va.length,
        products = [],
        i;

    for (i = 0; i !== vaLen; i++){
      products.push(va[i] * vb[i]);
    }

    return products.reduce(function(x, y){
      return x + y;
    });
  }

  // result will be an dot product array
  function rowPerColumn(rv, cv){

    var result = [];

    rv.forEach(function(row){

      var tmp = [];
      cv.forEach(function(col){
        tmp.push(dotProduct(row, colVectorToRowVector(col)));
      });

      result.push(tmp);
    });

    return result;
  }

  // DEPRECATE THIS!!
  // function isVector(a){
  //   var aSize = getVectorSize(a);
  // 
  //   return aSize[0] !== aSize[1] ? true : false;
  // }

  function isRowVector(a){

    var aSize = getVectorSize(a);
    return aSize[0] <= aSize[1] ? true : false;
  }

  function isColVector(a){

    var aSize = getVectorSize(a);
    return aSize[0] > aSize[1] ? true : false;
  }

  function isMatrix(a){

    var aSize = getVectorSize(a);
    return aSize[0] === aSize[1] ? true : false;
  }


  function multiplyVectors(a, b){

    var x = getVectorSize(a),
        y = getVectorSize(b),
        aTest = [isRowVector(a), isColVector(a)],
        bTest = [isRowVector(b), isColVector(b)];

    if (canBeMultiplicated(a, b)){
      
      if (isRowVector(a)){

        return rowPerColumn(a, b);
      } else {
        
        // Implement the tensor product
        // return columnPerRow(a, b);
      }
    } else {
      console.error("Cannot multiplicate a[] * b[]");
    }
  }

  (function(){
    w.matrixProduct = {
      prod: multiplyVectors
    };

  })();

})(window);

/*
  matrixProduct.prod([[1, 2, 3]], [[[1],[2],[3]]]);
  matrixProduct.prod([[1, 2, 3], [4,5,6]], [[[1],[2],[3]], [[4],[5],[6]]]);
*/