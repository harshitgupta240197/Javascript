// LOOPS 

/*
Guidelines for Loops

    1. Keyword
    2. Termination Condition
    3. Body of Loop
*/

/*

WHILE LOOPS

1. While loop : 
        Checks the conditions first and then executes code

2. Do/While loop :
        -> Does the statements first and then checks the condition at the end of it.
        -> This will run at least once no matter what happens even if the condition is wrong.
*/


/*

FOR LOOPS

1. For Loop :
 
        a. initialization of a number
        b. condition
        c. increment

2. For/In Loop
3. For/Of Loop
4. forEach Loop

*/


/* Write a WHILE loop that calulates the sum of all numbers from 1 to 5
and stores the result in a variable called 'sum'
*/

let sum = 0
let i = 1

while (i <= 5) {
    sum = sum + i         // can also be written as  sum = sum += i
    i++
} 

console.log(sum);

/*
Write a WHILE loop that counts down from 5 to 1 and stores the numbers in an array named 'countdown'
*/

let countdown = []
let j = 5

while (j >= 1) {
    countdown.push(j)
    j--
}

console.log(countdown);



/*
Write a 'do-while' loop that prompts the user to type their favorite car name until they enter 'stop'.
Store each car name in an array called 'carCollections'.
*/
// This code can be run in the browser only
/*
let carCollections = []
let car

do {
    car = prompt('Enter your fav car name')

    if (car !== 'stop') {
        carCollections.push(car) 
    }
    
} while (car !== 'stop');

console.log(carCollections);
*/


/*
Write a do-while loop that adds numbers 1 to 3 and stores the result in a variable  called 'total'
*/

let total = 0
let w = 0

do {
    total = total + w
    w++

} while (total < 4);

console.log(total);



/*
Write a for loop that multiplies each element in the array '[2,4,6]' by 2 and stores the results in a new array named
'multipliedNumbers'
*/

/* For Loop :
 
        a. initialization of a number
        b. condition
        c. increment

        for (initPhase; condition; incre/decre) {
        }
*/

let multipliedNumbers = []
let numbers = [2, 4, 6]

for (let m = 0; m < numbers.length ; m++) { 
        multipliedNumbers.push(numbers[m] * 2)    
}
console.log(multipliedNumbers);


/*
Write a FOR loop that lists all the cities in the array ['Paris', 'New York', 'Tokyo', 'London']
and stores each city in a new array named 'cityList'
*/

let cityList = []
let citiesNew = ['Paris', 'New York', 'Tokyo', 'London']

for (let x = 0; x < citiesNew.length; x++) {
    cityList.push(citiesNew[x]);
}
console.log(cityList);
