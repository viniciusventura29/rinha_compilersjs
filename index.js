const { rinhaExecutor } = require("./rinhaExecutor");
rinhaExecutor()

const operacoes = {
  "Add": (left, right) => {
    return operation(left) + operation(right)
  },
  "Sub": (left, right) => {
    return operation(left) - operation(right)
  },
  "Mul":(left,right)=>{
    return operation(left) * operation(right)
  },
  "Div":(left,right)=>{
    return operation(left) / operation(right)
  }
}


function operation(expression) {
  if (expression.kind == "Print") {
    const val = operation(expression.value);
    return console.log(val)
  }
  if (!expression.op) {
      return expression.value
  }

  return operacoes[expression.op](expression.lhs, expression.rhs)
}
  
let file = require("./source.rinha.json");
operation(file.expression);

// function Sub(value, operationList) {
//   if (value.lhs.kind == "Str" || value.rhs.kind == "Str") {
//     throw new Error("You can not subtract a string!");
//   } else {
//     if (value.rhs.rhs) {
//       operationList.push(value.lhs.value,'-')
//       return Sub(value.rhs, operationList);
//     } else {
//       operationList.push(value.lhs.value,'-', value.rhs.value)
//       return operationList;
//     }
//   }
// }
