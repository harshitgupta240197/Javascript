/* Write an arrow function named calculateTotal that takes two parameters : price and quantity
The function should return the total cost by multiplying the price and quantity
Store the result in a variable called totalCost
*/

const calculateTotal = (price, quantity) => {
    return price * quantity
}
let totalCost = calculateTotal(4,2);

console.log(totalCost);

/*
Even shorter way of doing the same using idiomatic arrow function

const calculateTotal = (price, quantity) => price * quantity;

const totalCost = calculateTotal(4, 2);

*/
