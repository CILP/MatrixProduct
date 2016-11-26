function getSize(m){

  return [m.length, m[0].length];
}

function isColumn(m){

  return m[0].length < m.length ? true : false;
}

function canBeMultiply(a, b){

  return a[1] === b[0] ? true : false;
}

function buildProduct(rn, cn, m){

  var result = [],
      tmp,
      i, j;

  for (i = 0; i !== rn; i++){

    tmp = [];
    for (j = 0; j !== cn; j++){

      (function(i, j, m){

        tmp.push(function(a, b){

          var products = [],
              k;

          for (k = 0; k !== m; k++){
            products.push(
              a[i][k] * b[k][j]
            );
          }

          return products.reduce(function(x, y){
            return x + y;
          });
        });
      })(i, j, m);
    }

    result.push(tmp);
  }

  return result;
}

function multiply(a, b){

  var aSize = getSize(a),
      bSize = getSize(b),
      products = [],
      result = [],
      tmp = [];
  
  if (canBeMultiply(aSize, bSize)){

    products = buildProduct(aSize[0], bSize[1], aSize[1]);

    products.forEach(function(p){
    
      tmp = [];

      p.forEach(function(fn){
        tmp.push(fn(a, b));
      });

      result.push(tmp);
    });
  } else {
    throw new Error('multiply(): Cannot multiply a * b');
  }
  
  return result;
}