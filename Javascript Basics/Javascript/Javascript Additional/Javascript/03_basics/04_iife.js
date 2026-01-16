//************************************ Immediately Invoked Fucntion Expressions (IIFE) ***************************************** */

// 1. We dont want any pollution from the Global Scope
// 2. We also want it to execute immediately

// IIFE
// (() => {})()


// Why use IIFE ?
// Sometime Global Scope causes pollution so to remove the pollution from global scope we use IIFE and also so that the execution is immediate in nature.
(function chai(){
    // named IIFE
    console.log('DB Connected');
})(); // Here the semi colon is very important


// If you run another IIFE function immediately after the one before then it wont run
// So we have to put a semi colon just after the first function

(function aurCode(){
    console.log('DB Connected');
})();


// Unnamed IIFE
// Passing parameter name here
((name) => {
    console.log(`DB Connected for ${name}`);    
})('Harshit')