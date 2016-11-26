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

    result = [v.length, vZero.length];

    // firstElement would be a number or an array
    // if is an array... is a column vector
    // otherwise... is a row vector/matrix
    if (checkVariableType(firstElement, 'Array')){
      result.reverse();
    }

    return result;
  }

  // NOTE: Optimize this :(
  // REFACTORIZAR
  function colVectorToRowVectorTensor(v){

    // recibe todo el vector de columnas
    // [ [ [a], [b], [c] ], [ [a], [b], [c] ] ]
    var vSize = getVectorSize(v); // [3, 2]
    var i, j;

    var nuevoAcomodo = [];
    
    for (i = 0; i !== vSize[1]; i++){

      for (j = 0; j !== vSize[0]; j++){

        if (checkVariableType(nuevoAcomodo[j], 'Array')){
          nuevoAcomodo[j].push(v[i][j][0]);
        } else {
          nuevoAcomodo[j] = [v[i][j][0]];
        }
      }
    }

    return nuevoAcomodo;
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

  // DEPRECATE THIS!!
  // function dotProduct(va, vb){
  // 
  //   var vaLen = va.length,
  //       products = [],
  //       i;
  // 
  //   for (i = 0; i !== vaLen; i++){
  //     products.push(va[i] * vb[i]);
  //   }
  // 
  //   return products.reduce(function(x, y){
  //     return x + y;
  //   });
  // 
  //   return products;
  // }

  function getDotProduct(p){

    return p.reduce(function(x, y){
      return x + y;
    });
  }

  // Default Way, Row * Col
  function getClassicProducts(va, vb){

    var vaLen = va.length,
        products = [],
        i;
    
    // FIXME: esto solo funciona cuando la matriz
    // va tiene la misma longitud que la matriz vb
    // por eso si se debe de hacer el getTensorProduct :(
    for (i = 0; i !== vaLen; i++){
      products.push(va[i] * vb[i]);
    }

    return products;
  }

  function getTensorProducts(va, vb){

    var products = [];

    va.forEach(function(c){

      var tmp = [];

      vb.forEach(function(r){
        tmp.push(c * r);
      });

      products.push(tmp);
    });

    return products;
  }

  // result will be an dot product array
  function rowPerColumn(rv, cv){

    var result = [];

    rv.forEach(function(row){

      var tmp = [];
      cv.forEach(function(col){
        tmp.push(getDotProduct(getClassicProducts(row, colVectorToRowVector(col))));
      });

      result.push(tmp);
    });

    return result;
  }

  function colPerRow(cv, rv){

    var result = [];

    var cvToRow = colVectorToRowVectorTensor(cv);

    cvToRow.forEach(function(cr){

      // var tmp = [];
      rv.forEach(function(row){
        result.push(getTensorProducts(cr, row));

        // console.info(tmp);
      });

      // result.push(tmp);
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

        // Si a es una columna de longtiud n * 1
        // Se debe obtener el tensor product
        if (x[1] === 1){
          return colPerRow(a, b);
        } else {
          // dot product
        }

        // Si a es una columna de longitud n * m
        // Se siguen la forma normal por 
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

  matrixProduct.prod([[[1],[4],[7],[10]], [[2],[5],[8],[11]], [[3],[6],[9],[12]]], [[10,20,30,40],[100,200,300,400],[1,2,3,4]]);
[[[1],[4],[7],[10]], [[2],[5],[8],[11]], [[3],[6],[9],[12]]]
[[10,20,30,40],[100,200,300,400],[1,2,3,4]]

*/
