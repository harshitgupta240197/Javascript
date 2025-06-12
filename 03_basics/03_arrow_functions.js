// Using THIS keyword
const user = {
    username: "Harshit",
    subscription: 999,

    welcomeMessage: function(){
        // Since we are referring to the current context then we will use THIS keyword
        console.log(`Welcome to the channel ${this.username}. You subscription plan is ${this.subscription}`);
        console.log(this); // Prints the current context
        
    }
}

user.welcomeMessage()

// Now we will attempt to change the context
user.username = "SAM"
user.welcomeMessage() // As a result the username changes.

// We will try to print the current context out of the scope this time
console.log(this); // This will print empty object since we are using NODE environment whereas in a browser it will give Window object (Global Object)




// Now we will run THIS as standalone
function coffee(){
    console.log(this);
    
}
// Now we will call this function
coffee() // Prints various types of values including Global Values 


// Now we will try to run THIS inside a function instead of an obejct
const chai = function (){
    let chaiType = "Kadak"
    console.log(this.chaiType);
    
}
chai() // Reults in undefined



//******************************************** ARROW FUNCTION **********************************************/

const espresso = () =>  {
    let espressoType = "intense"
    console.log(this);
    console.log(this.espressoType);
    
}
espresso()



// BASICS ARROW FUNCTION           () => {}

const addTwo = (num1, num2) => {
    return num1 + num2                   // We will have to call RETURN here since we are using curly braces
}
console.log(addTwo(3, 4))


// IMPLICIT RETURN => Arrow Function
// In this we will remove b
const plusTwo = (number1, number2) => number1 + number2

const substractTwo = (number3, number4) => (number3 - number4)

console.log(plusTwo(5, 7))
console.log(substractTwo(7, 9))
// If curly braces is used then we will have to write RETURN keyword
// If parenthesis is used then we will not have to write the RETURN keyword


// To return an object you will always have to wrap it inside curly braces
const multiplyTwo = (number7, number8) => ({username: 'harshit'}) // If you remove the curly braces it will thow an error or will return undefined