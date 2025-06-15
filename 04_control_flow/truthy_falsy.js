const userEmail = 'harshitgupta@gmail.com'
// If there is an empty string then it will print as did not get email
// If there is an empty Array [] then it will accept it

if (userEmail.includes('@')) {
    console.log('User Email Correctly Entered');
} else {
    console.log('Please enter correct Email');
    
}



// ****************************** List of FALSY values ***************************************************

// 1. false
// 2. 0
// 3. -0
// 4. BigInt 0n
// 5. ""
// 6. NaN
// 7. null
// 8. undefined


// ****************************** List of some TRUTHY values ***************************************************

// 1. "0"
// 2. "false"
// 3. " "
// 4. []
// 5. {}
// 6. function(){}


const emptyObj = {}

if (Object.keys(emptyObj).length === 0) {
    console.log('Object is empty');
}



// false == 0           This returns true
// false == ''          This returns true
// 0 == ''              This returns true



//*************************************************** NULLISH COALESCING OPERATOR (??) : null undefined ********************************** */

// This is a safety checker to avoid NULL and UDNEFINED values

let val1;
val1 = 5 ?? 10 
console.log(val1); // This will print 5

let val2;
val2 = null ?? 10 // This will skip null and print 10
console.log(val2);

let val3;
val3 = undefined ?? 15 // This will skip undefined and print 15
console.log(val3);

let val4;
val4 = null ?? undefined ?? 10 ?? 15 // This will skip null & undefined and print 10 
console.log(val4);
 



//***************************************************** TERNARY OPERATOR (?) ********************************** */

// condition ? true : false

const itemPrice = 1000
itemPrice > 500 ? console.log('Price is more than 500') : console.log('Price is less than 500');

// Using this way it is shorter to create a true-false condiiton
