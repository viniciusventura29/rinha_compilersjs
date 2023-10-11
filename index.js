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
    if (right === 0) {
      // haha you wish
      return console.error("You can not divide by zero");
  }
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
