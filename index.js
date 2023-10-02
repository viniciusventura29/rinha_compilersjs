// const rinhaExecutor = require("./rinhaExecutor");
// rinhaExecutor();

let file = require("./source.rinha.json");
var sum = 0 

switch (file.expression.kind) {
  case "Print":
    console.log(operation(file.expression.value,sum));
}

function operation(expression, sum) {
  console.log(expression)
  if (!expression.op){
    return expression.value.value
  }
  switch (expression.op){
    case "Add":
      return Add(expression, sum);
    case "Sub":
      return Sub(expression, sum);
  }

}

function Add(value, sum) {
  if (value.lhs.kind == "Str" || value.rhs.kind == "Str") {
    if (value.rhs.rhs) {
      sum += value.lhs.value.toString();
      return operation(value.rhs.value);
    }
    sum += value.lhs.value.toString() + value.rhs.value.toString();
    return sum;
  } else {
    if (value.rhs.rhs) {
      sum += value.lhs.value;
      return operation(value.rhs, sum);
    }
    sum += value.rhs.value + value.lhs.value;
    return sum;
  }
}

function Sub(value, sub) {
  if (value.lhs.kind == "Str" || value.rhs.kind == "Str") {
    throw new Error("You can not subtract a string!");
  } else {
    if (value.rhs.rhs) {
      sub += value.lhs.value;
      return Sub(value.rhs, sub);
    } else {
      sub -= value.lhs.value + value.rhs.value;
      return sub;
    }
  }
}
