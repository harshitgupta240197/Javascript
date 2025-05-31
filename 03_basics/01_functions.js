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
