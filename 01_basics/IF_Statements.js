// 1. Check if a number is greater than the other number
let num1 = 45
let num2 = 56

// IF STATEMENT

if (num1 > num2) {
    console.log('num1 is greater than num2');
} else {
    console.log('num2 is greater than num1');
    
}


// 2. Check if a string is euqal to another string
let string1 = 'harshit'
let string2 = 'harshit'

if (string1 == string2) {
    console.log('string1 is equal to string2');
} else {
    console.log('both the strings are different');
}



// Check if a variable is a number or not
let score = 'sdsd'

if (typeof score === 'number') {
    console.log('It is a number datatype');
} else {
    console.log(`It is a ${typeof score}`);  
}