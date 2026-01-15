/*
Task 1: Using Array Methods
Write a function squareNumbers(arr) using map() and arrow functions
*/
const squareNumbers = (arr) => {
  return arr.map((num) => {
    return num * num;
  });
};

/*
Task 2: Custom Filter Function
Create a function filterEvenNumbers(arr) using filter() and arrow functions
*/
const filterEvenNumbers = (arr) => {
    return arr.filter((num) => {
        return num % 2 === 0;
    });
};


/*
Task 3: Sum of Positive Numbers
Write a function sumPositiveNumbers(arr) that takes an array of numbers and returns the sum of 
all positive numbers using filter() and reduce() with arrow functions
*/
const sumPositiveNumbers = (arr) => {
    return arr
        .filter(num => num > 0)
        .reduce((sum, num) => sum + num, 0);
};


/*
Task 4: Transform Array of Objects

Write a function getNames(arr) that takes an array of objects where each object has a name property, 
and returns an array of just the names using map() and arrow functions
*/
const getNames = (arr) => {
    return arr.map(obj => obj.name);
};


/*
Task 5: Find the Longest Word

Write a function findLongestWord(arr) that takes an array of strings and returns 
the longest word using reduce() and an arrow function
*/
const findLongestWord = (arr) => {
    return arr.reduce((longest, current) =>
        current.length > longest.length ? current : longest
    );
};
