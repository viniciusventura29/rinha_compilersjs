const rinhaExecutor = require('./rinhaExecutor')
rinhaExecutor()

let file = require('./source.rinha.json');


switch (file.expression.kind){
    case "Print":
        console.log(operation(file.expression))

}

function operation(expression){
    switch (expression.value.kind){
        case "Str":
            return expression.value.value
        case "Binary":
            if (expression.value.op == "Add"){
                return Add(expression.value)
            }
    }
}

function Add(value){

}