/*
Asynchronous JavaScript is a programming technique that allows code to run without blocking 
the main execution thread, enabling non-blocking operations and improving application responsiveness. W
hile JavaScript is single-threaded and synchronous by default, asynchronous methods are essential for 
handling time-consuming tasks like network requests, data fetching (APIs), and file operations. 
*/

// Ability to have a PAUSE in the language

/**
 
 1. Network calls
 2. Write / Read files
 3. Time Functions
 4. User Inputs

 */

function sayHello() {
  console.log('Hey I am saying Hello!');
}

for (let i = 0; i < 15; i++) {
  console.log(i);
  ;
  
}

setTimeout(() => {
  sayHello()
  
}, 9000);
