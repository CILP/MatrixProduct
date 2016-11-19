// NOTE: Implement Memoization 
(function(w){

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

    // Fast check :S
    return [v.length, v[0].length];
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

  function isVector(a){
    var aSize = getVectorSize(a);

    return aSize[0] !== aSize[1] ? true : false;
  }

  function isMatrix(a){
    var aSize = getVectorSize(a);

    return aSize[0] === aSize[1] ? true : false;
  }


  function multiplyVectors(a, b){

    if (isVector(a)){
      return rowPerColumn(a, b);
    }
  }

  (function(){
    w.matrixProduct = {
      prod: multiplyVectors
    };

  })();

})(window);

/*
  matrixProduct.prod([[1, 2, 3], [[[1],[2],[3]]]);
  matrixProduct.prod([[1, 2, 3], [4,5,6]], [[[1],[2],[3]], [[4],[5],[6]]]);
*/