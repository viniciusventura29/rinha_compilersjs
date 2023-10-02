// const rinhaExecutor = require("./rinhaExecutor");
// rinhaExecutor();

let file = require("./source.rinha.json");
var operationList = []

function transformArrayToMathExpression(array) {
  // Join the array elements into a single string
  const mathExpression = array.join(' ');

  // Define a regular expression to match supported operators (+, -, *, /, %)
  const operatorRegex = /(\d+)\s*([+\-*\/%])\s*(\d+)/;

  // Replace operator strings with real operators and evaluate the expression
  const result = mathExpression.replace(operatorRegex, (match, operand1, operator, operand2) => {
    switch (operator) {
      case '+':
        return parseFloat(operand1) + parseFloat(operand2);
      case '-':
        return parseFloat(operand1) - parseFloat(operand2);
      case '*':
        return parseFloat(operand1) * parseFloat(operand2);
      case '/':
        if (parseFloat(operand2) !== 0) {
          return parseFloat(operand1) / parseFloat(operand2);
        } else {
          throw new Error('Division by zero is not allowed.');
        }
      case '%':
        return parseFloat(operand1) % parseFloat(operand2);
      default:
        return match; // Return the original string if the operator is not supported
    }
  });

  console.log(result)

  return result;
}

switch (file.expression.kind) {
  case "Print":
  var result = transformArrayToMathExpression(operation(file.expression.value, operationList))
  console.log(result)
}

function operation(expression, operationList) {
  if (!expression.op) {
    return expression.value.value
  }
  switch (expression.op) {
    case "Add":
      return Add(expression, operationList);
    case "Sub":
      return Sub(expression, operationList);
  }

}

function Add(value, operationList) {
  if (value.lhs.kind == "Str" || value.rhs.kind == "Str") {
    if (value.rhs.rhs) {
      operationList.push(value.lhs.value.toString(), '+')
      return operation(value.rhs, operationList);
    }
    operationList.push(value.lhs.value.toString(), '+', value.rhs.value.toString())
    return operationList;
  } else {
    if (value.rhs.rhs) {
      operationList.push(value.lhs.value, '+')
      return operation(value.rhs, operationList);
    }
    operationList.push(value.rhs.value + value.lhs.value)
    return operationList;
  }
}

function Sub(value, operationList) {
  if (value.lhs.kind == "Str" || value.rhs.kind == "Str") {
    throw new Error("You can not subtract a string!");
  } else {
    if (value.rhs.rhs) {
      operationList.push(value.lhs.value,'-')
      return Sub(value.rhs, operationList);
    } else {
      operationList.push(value.lhs.value,'-', value.rhs.value)
      return operationList;
    }
  }
}
