/*
Asynchronous JavaScript is a programming technique that allows code to run without blocking 
the main execution thread, enabling non-blocking operations and improving application responsiveness. W
hile JavaScript is single-threaded and synchronous by default, asynchronous methods are essential for 
handling time-consuming tasks like network requests, data fetching (APIs), and file operations. 
*/

// Ability to have a PAUSE in the language

function sayHello() {
  console.log("I would like to say Hello");
}

setTimeout(() => {
  sayHello();
}, 4000);

console.log("chaicode");


// SYNCHRONOUS CODE
for (let index = 0; index < 10; index++) {
  console.log(index);
}
