// Let us craete a simple function

function basicFunction(){
    console.log("H");
    console.log("A");
    console.log("R");
    console.log("S");
    console.log("H");
    console.log("I");
    console.log("T");
    
}

basicFunction()





// Let us create a functions that adds two numbers

function addTwoNumbers(number1, number2){
    console.log(number1 + number2);
    
}

// number 1 and number 2 are called PARAMETERS
// When we call these parameters as real numbers like 4 and 5 then they are called ARGUMENTS

addTwoNumbers(4, 5) // We can provide any number/argument 
// If we input one number and one string then it will not get added instead it will get concatenated

// We can also store them in a VARIABLE
const resultNumber = addTwoNumbers(7, 3)
console.log("RESULT: ", resultNumber); // This will give UNDEFINED



// To solve this issue of undefined we do this
function numberAdder(num1, num2){
    let resultant = num1 + num2
    return resultant // After we declare RETURN no process will be executed below it
}

const resultant = numberAdder(6, 5)
console.log("Resultant: ", resultant);


// A shorter/faster way of doing the above task is
function numAdder(numerical1, numerical2){
    return numerical1 + numerical2
}

const resultNumerical = numAdder(4, 7)
console.log("Resultant Numerical: ", resultNumerical);





// Creating another function that mentions Logged In user
function loginUserMessage(username){
    return `${username} just logged in`
}

const logging = loginUserMessage('Harshit')
console.log(logging);
console.log(loginUserMessage('Harshit')) // Another way




//Introducing IF - ELSE conditions
function userNameCheck(userIdentity){
    if (userIdentity === undefined){                // can also be written like this : if(!userIdentity)
        console.log("Please enter a username");
        return
    }
    return `Welcome back ${userIdentity}`
}

console.log(userNameCheck());






// Shopping Cary
function calculateCartPrice(num1){
    return num1
}
console.log(calculateCartPrice(200, 300, 400)); // This will always return num1 value   200



// Using REST/Spread operator
function calculateCartValue(...num2){ // In case val1, val2 are writen before ...num2 then only the last values will be diplayed which come after val1 and val2
    return num2
}
console.log(calculateCartValue(200, 300, 400)); // Returns [ 200, 300, 400 ] which is an array








// Learning how to pass an object in a function

// First create an object
const user = {
    name: "Harshit",
    gender: "Male"
}

// Now we will pass this object in a function
function handleObject(anyObject){
    console.log(`Username is ${anyObject.name} and Gender is ${anyObject.gender}`);
    
}

handleObject({
    name: "Gupta",
    gender: "Male Harshit"
}) // Returns Username is Gupta and Gender is Male Harshit









// Learning to pass an ARRAY through a function
const myNewArray = [200, 400, 500, 700, 1000]

// Now we will create a function that can return the second value from any array
function returnSecondValue(getArray){ // In this case we use getArray to keep everything generic
    return getArray[1]
}

console.log(returnSecondValue(myNewArray)); // We can pass in any array inside this function and it will always return the second value
