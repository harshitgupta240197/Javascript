// ******************************* JAVASCRIPT EXECUTION CONTEXT *****************************//

// Write a function called makeTea that takes one parameter called typeOfTea and returns a string like 'Making green tea'
// Store the result in a variable called teaOrder
function makeTea(typeOfTea) {
    return `Making ${typeOfTea}`;  
}
let teaOrder = makeTea('Chai Tea')
console.log(teaOrder);

/* Create a function named 'orderTea' that takes one parameter. 'teaType'. Inside this function create another function named 'confirmOrder'
that returns a message like "Order confirmed for chai"
Call 'confirmOrder' from within 'orderTea' and return the result.
*/

function orderTea(teaType) {
    function confirmOrder() {
        return `Order confirmed for ${teaType}` 
    } 
    return confirmOrder()
}
console.log(orderTea('Green tea'));





