// ************************ HIGHER ORDER FUNCTIONS ****************************
// ************************ FIRST CLASS FUNCTIONS ***********************************

/*
A higher-order function is a function that does one of the following:

Takes another function as an argument.
Returns another function as its result.
Higher-order functions help make your code more reusable and modular by allowing you to work with functions like any other value.

*/

// Write a function called 'processedTeaOrder' that takes another function 'makeTea' as a parameter and calls 
// it with the argument 'earl grey'. Return the result of calling 'makeTea'

function processedTeaOrder(makeTea) {
    return makeTea('earl grey')
}

function makeTea(teaTypes) {
    return `Making ${teaTypes}`
}
console.log(processedTeaOrder(makeTea));



/*
Write a function named createTeaMaker that returns another function. THe returned function should take one parameter, teaType
and return a message like 'Making green tea'.
Store the returned function in a variable called teaMaker and call it with 'green tea'
*/

function createTeaMaker(){
    return function teatasting(teaType) {
        return `Making ${teaType}`
    }
}

let teaMaker = createTeaMaker()
console.log(teaMaker('Green Tea'));









