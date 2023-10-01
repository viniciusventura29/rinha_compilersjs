const rinhaExecutor = require("./rinhaExecutor");
rinhaExecutor();

let file = require("./source.rinha.json");

switch (file.expression.kind) {
  case "Print":
    console.log(operation(file.expression));
}

function operation(expression) {
  switch (expression.value.kind) {
    case "Str":
      return expression.value.value;
    case "Binary":
      if (expression.value.op == "Add") {
        return Add(expression.value, 0);
      } else if (expression.value.op == "Sub") {
        return Sub(expression.value, 0);
      }
  }
}

function Add(value, sum) {
  if (value.lhs.kind == "Str" || value.rhs.kind == "Str") {
    if(value.rhs.rhs){
        sum += value.lhs.value.toString();
        return Add(value.rhs.value)
    }
    sum += value.rhs.value.toString() + value.rhs.value.toString()
    return sum
  } else {
    if (value.rhs.rhs) {
      sum += value.lhs.value;
      return Add(value.rhs, sum);
    }
    sum += value.rhs.value + value.lhs.value;
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
